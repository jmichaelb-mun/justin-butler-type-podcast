using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TypeMatchup : MonoBehaviour
{

    public string currentType;
    public string attackState;
    [SerializeField] Sprite[] typeSprites;
    [SerializeField] Sprite newSprite;
    // Start is called before the first frame update
    
    public void setVariables(string state, string type)
    {
        attackState = state;
        currentType = type;
        foreach (Sprite sp in typeSprites) {
            if (sp.name == currentType)
            {
                newSprite = sp;
                gameObject.GetComponent<SpriteRenderer>().sprite = newSprite;
            }
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        PlayerController controller = collision.GetComponent<PlayerController>();
        if (controller != null)
        {
            bool correctSelect = false;
            foreach (PlayerController.TypeEntry t in controller.response.DamageRelations.DoubleDamageTo)
            {
                if (t.Name == currentType)
                {
                    controller.ChangeScore(1);
                    correctSelect = true;
                    gameObject.GetComponent<SpriteRenderer>().color = Color.green;
                    gameObject.GetComponent<BoxCollider2D>().enabled = false;
                }
            }
            if (!correctSelect)
            {
                controller.ChangeHealth(-1);
                Debug.Log(GameController.Instance.currentHealth);
                gameObject.GetComponent<SpriteRenderer>().color = Color.red;
                gameObject.GetComponent<BoxCollider2D>().enabled = false;
            }
        }
    }
}
