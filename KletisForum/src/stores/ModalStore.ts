import { defineStore } from "pinia";
import { readonly, ref, shallowRef, computed } from "vue";
import { type ModalState } from "@/types/ModalState";

export const useModalStore = defineStore('Modal', ()=>{
    const initialState: ModalState = {
        component: null,
        componentProps: {}
    }
    const CurrentModal = shallowRef<ModalState>(initialState)
    const isModal = ref<boolean>(false)
    const isTriggerChange = ref<boolean>(false)
    const isTriggerTractorChange = ref<boolean>(false)
    const isTriggerPostChange = ref<boolean>(false)
    const isTriggerCommentChange = ref<boolean>(false)
    const isTriggerUserChange = ref<boolean>(false)

    function SetModal(modalOptions: ModalState){
        CurrentModal.value = modalOptions
        isModal.value=true
    }

    function ResetModal(){
        CurrentModal.value = initialState
        isModal.value=false
    }

    function TriggerChange(){
        isTriggerChange.value = !isTriggerChange.value
    }

    function TriggerTractorChange(){
        isTriggerTractorChange.value = !isTriggerChange.value
    }

    function TriggerPostChange(){
        isTriggerPostChange.value = !isTriggerChange.value
    }

    function TriggerCommentChange(){
        isTriggerCommentChange.value = !isTriggerChange.value
    }

    function TriggerUserChange(){
        isTriggerUserChange.value = !isTriggerChange.value
    }
    
    const isTriggerTractors = computed(() => {
        return isTriggerTractorChange
    })
    
    const isTriggerPosts = computed(() => {
        return isTriggerPostChange
    })
    
    const isTriggerComment = computed(() =>{
        return isTriggerCommentChange
    })

    const isTrigger = computed(() => {
        return isTriggerChange
    })

    const isTriggerUser = computed(() => {
        return isTriggerUserChange
    })

    return {SetModal, ResetModal, CurrentModal, isModal: readonly(isModal), isTriggerUser, isTrigger, TriggerUserChange,
         isTriggerTractors, isTriggerPosts, isTriggerComment, TriggerChange, TriggerTractorChange, TriggerPostChange, TriggerCommentChange}
})