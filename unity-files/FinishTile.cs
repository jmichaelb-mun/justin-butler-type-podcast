using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;

public class FinishTile : MonoBehaviour
{

    [DllImport("__Internal")]
    private static extern void GoNext(string isFinished);
    private void OnTriggerEnter2D(Collider2D collision)
    {
        PlayerController controller = collision.GetComponent<PlayerController>();
        if (controller != null)
        {
            controller.MoveAction.Disable();
            gameObject.GetComponent<AudioSource>().Play();

            
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GoNext ("true");
#endif
        }
    }
}
