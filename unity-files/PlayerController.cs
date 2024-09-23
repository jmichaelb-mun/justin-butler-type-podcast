using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using System.Runtime.InteropServices;
using UnityEngine.Networking;
using static System.Net.WebRequestMethods;
using Newtonsoft.Json;
using System.Linq;
using UnityEngine.SceneManagement;

public class PlayerController : MonoBehaviour
{
    Rigidbody2D rigidbody2d;
    Vector2 move;
    public InputAction MoveAction;
    public Animator Animator;
    public int maxHealth;
    public int score;
    public int currentHealth;
    public string currentType;
    public TypeResponse response;
    public string currentDirection = "down";
    public float speed = 3.0f;

    [DllImport("__Internal")]
    private static extern void GameOver(int score);

    [DllImport("__Internal")]
    private static extern void SendType(string type);

    [DllImport("__Internal")]
    private static extern void UpdateHealthScore(int health, int score);

    public class TypeResponse
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("damage_relations")]
        public DamageRelations DamageRelations { get; set; }

        [JsonProperty("pokemon")]
        public List<PokemonEntry> Pokemon { get; set; }
    }

    public class DamageRelations
    {
        [JsonProperty("double_damage_from")]
        public List<TypeEntry> DoubleDamageFrom { get; set; }

        [JsonProperty("double_damage_to")]
        public List<TypeEntry> DoubleDamageTo { get; set; }

        [JsonProperty("half_damage_from")]
        public List<TypeEntry> HalfDamageFrom { get; set; }

        [JsonProperty("half_damage_to")]
        public List<TypeEntry> HalfDamageTo { get; set; }

        [JsonProperty("no_damage_from")]
        public List<TypeEntry> NoDamageFrom { get; set; }

        [JsonProperty("no_damage_to")]
        public List<TypeEntry> NoDamageTo { get; set; }
    }

    public class TypeEntry
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class PokemonEntry
    {
        [JsonProperty("slot")]
        public int Slot { get; set; }

        [JsonProperty("pokemon")]
        public TypeEntry Pokemon { get; set; }
    }
    // Start is called before the first frame update
    void Start()
    {
        rigidbody2d = GetComponent<Rigidbody2D>();
        MoveAction.Enable();
        if(GameController.Instance != null)
        {
            currentHealth = GameController.Instance.currentHealth;
            score = GameController.Instance.score;
            maxHealth = GameController.Instance.maxHealth;
        }
        System.Random rand = new System.Random();
        int typeNum = rand.Next(2,19);
        string URL = $"https://pokeapi.co/api/v2/type/{typeNum}";
        StartCoroutine(GetType(URL));
    }

    // Update is called once per frame
    void Update()
    {
        move = MoveAction.ReadValue<Vector2>();
        if(move.x < 0 && move.y == 0)
        {
            currentDirection = "left";
        }
        else if (move.x > 0 && move.y == 0)
        {
            currentDirection = "right";
        }
        else if (move.y > 0 && move.x == 0)
        {
            currentDirection = "down";
        }
        else if (move.y > 0 && move.x == 0)
        {
            currentDirection = "up";
        }
    }

    void FixedUpdate()
    {
        Vector2 position = (Vector2)rigidbody2d.position + move * speed * Time.deltaTime;
        rigidbody2d.MovePosition(position);
    }

    public void ChangeHealth(int amount)
    {
        GameController.Instance.currentHealth = Mathf.Clamp(GameController.Instance.currentHealth + amount, 0, maxHealth);
        currentHealth = GameController.Instance.currentHealth;
        if(currentHealth == 0)
        {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GameOver (score);
#endif
        }
        else
        {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    UpdateHealthScore (currentHealth, score);
#endif
        }
    }

    public void ChangeScore(int amount)
    {
        GameController.Instance.score += amount;
        score = GameController.Instance.score;
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    UpdateHealthScore (currentHealth, score);
#endif
    }

    public void ReloadScene()
    {
        SceneManager.LoadScene("MainScene");
    }

    IEnumerator GetType(string url)
    {
        UnityWebRequest request = UnityWebRequest.Get(url);
        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.Success)
        {
            string responseText = request.downloadHandler.text;
            var typeResponse = JsonConvert.DeserializeObject<TypeResponse>(responseText);
            currentType = typeResponse.Name;
            response = typeResponse;
            GameObject[] types = GameObject.FindGameObjectsWithTag("attacker");
            int i = 0;
            System.Random rand = new System.Random();
            int correctTile = rand.Next(0, 3);
            List<String> usedList = new List<string>();
            foreach (GameObject type in types)
            {
                
                if (type.tag == "attacker")
                {
                    string newType = null;
                    if (i == correctTile)
                    {
                        int len = (response.DamageRelations.DoubleDamageTo.Count) -1;
                        int randNum = rand.Next(0, len);
                        newType = response.DamageRelations.DoubleDamageTo[randNum].Name;
                    }
                    else
                    {
                        int len = (response.DamageRelations.HalfDamageTo.Count) -1;
                        int randNum = rand.Next(0, len);
                        
                        if (usedList.Count == 0 || !usedList.Contains(response.DamageRelations.HalfDamageTo[randNum].Name))
                        {
                            newType = response.DamageRelations.HalfDamageTo[randNum].Name;
                            usedList.Add(newType);
                        }
                        else
                        {
                            if(currentType == "ghost")
                            {
                                newType = "normal";
                                usedList.Add(newType);
                            }
                            else if(currentType == "dragon")
                            {
                                newType = "fairy";
                                usedList.Add(newType);
                            }
                            else if (randNum == (response.DamageRelations.HalfDamageTo.Count)-1)
                            {
                                newType = response.DamageRelations.HalfDamageTo[0].Name;
                                usedList.Add(newType);
                            }
                            else
                            {
                                randNum += 1;
                                newType = response.DamageRelations.HalfDamageTo[randNum].Name;
                                usedList.Add(newType);
                            }
                        }
                    }
                    TypeMatchup script = (TypeMatchup)type.GetComponent(typeof(TypeMatchup));
                    if (script != null && newType != null)
                    {
                        script.setVariables("attacker", newType);
                    }
                }
                i++;
            }
            Debug.Log(currentType);
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    SendType (currentType);
#endif

        }
        else
        {
            Debug.Log("Error: " + request.error);
        }
    }
}
