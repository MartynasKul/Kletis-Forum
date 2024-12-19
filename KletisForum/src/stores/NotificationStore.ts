import { ref, computed, readonly } from "vue"
import { defineStore } from "pinia"
import type { Notification } from "@/types/Notification"

export const useNotificationStore = defineStore('notifications', ()=>{
    const notificationList = ref<Notification[]>([])
    const isEmpty = ref(true)
    let counter = 0
    const waitForTimer = ref(false)

    function setTimerForRemove(): void{
        setTimeout(() =>{
            removeNotification()
        }, 5000);
    }

    const shortenedNotificationList = computed(()=>{
        return notificationList.value.slice(0,5)
    })

    function addNotification(type: string, message: string) : void{
        notificationList.value.push({type: type, message: message, id: counter})
        counter++
        if(isEmpty.value){
            isEmpty.value = false
            setTimerForRemove()
        }
    }

    function successNotification(message: string): void{
        addNotification('Success', message)
    }

    function errorNotification(message: string): void{
        addNotification('Error', message)
    }

    function removeNotification(): void{
        if(!waitForTimer.value){
            notificationList.value.shift()
            if(notificationList.value.length == 0){
                isEmpty.value = true
                counter = 0
            }
            else{
                setTimerForRemove()
            }
        }
        else{
            waitForTimer.value = false
            setTimerForRemove()
        }
    }

    function removeNotificationById(id: Number): void{
        waitForTimer.value = true
        notificationList.value = notificationList.value.filter(notify =>notify.id !== id)
    }

    return{ isEmpty, errorNotification, successNotification, shortenedNotificationList, removeNotificationById}
})