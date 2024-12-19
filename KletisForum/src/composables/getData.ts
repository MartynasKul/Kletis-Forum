import { ref, readonly } from 'vue';
import { getData } from '@/services/APIService';
import { type GetAllDataOptions } from '@/types/GetAllDataOptions';
import type { User } from '@/types/User';
import type { Tractor } from '@/types/Tractor';
import type { Post } from '@/types/Post';
import type { Comment } from '@/types/Comment';
import { useNotificationStore } from '@/stores/NotificationStore';
import { useAuthStore } from '@/stores/AuthStore';

export function useCollections() {
    const isLoading = ref<boolean>(true);
    const dataList = ref<User[] | Tractor | Tractor[] | Post | Post[] | Comment | Comment[] | User>([]);
    const totalCount = ref<number>(0);
    const Notifications = useNotificationStore();

    async function getCollection({ collectionName, expand = null, id }: GetAllDataOptions) {
        const url = formUrl(collectionName, expand, id);
        isLoading.value = true;

        const res = await getData(url as string);

        if (res.error === true) {
            Notifications.errorNotification(`Error: ${res.message}`);
            useAuthStore().isUserLoggedIn();
            dataList.value = [];
            isLoading.value = false;
            totalCount.value = 0;
            return;
        }

        if (Array.isArray(res.data)) {
            dataList.value = res.data as User[] | Tractor[] | Post[] | Comment[];
            totalCount.value = res.data.length;
        } else {
            dataList.value = res.data as User | Tractor | Post | Comment;
            totalCount.value = 1;
        }

        isLoading.value = false;
    }

    function resetData(): void {
        dataList.value = [];
        isLoading.value = true;
    }

    return {
        resetData,
        getCollection,
        isLoading: readonly(isLoading),
        data: readonly(dataList),
        totalCount: readonly(totalCount),
    };
}

function formUrl(collectionName: String, expand: String | null, id?: String): String {
    const baseUrl = `${collectionName}`;
    let urlQ = id ? `${baseUrl}/${id}` : baseUrl;

    const params: string[] = [];

    if (expand) {
        params.push(`expand=${expand}`);
    }
    if (params.length > 0) {
        urlQ += '?' + params.join('&');
    }

    return urlQ;
}
