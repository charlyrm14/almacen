<script setup lang="ts">
    import { ref } from 'vue';

    defineEmits<{
        (e: 'CloseModalLocation'): void
    }>()

    const tabs = ref<number>(1)
    
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-dark rounded-2xl w-[95vw] h-[95vh] md:w-[40vw] md:h-auto max-w-300 flex flex-col overflow-hidden">

            <div class="flex justify-between items-center border-b border-gray-200 dark:border-dark-light px-6 py-2">
                <h2 class="text-xl text-gray-600 flex items-center gap-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cuboid-icon lucide-cuboid"><path d="M10 22v-8"/><path d="M2.336 8.89 10 14l11.715-7.029"/><path d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"/></svg>
                        Rack E2
                </h2>
                <button
                    class="text-gray-400 dark:text-gray-500 hover:text-red-500 transition cursor-pointer"
                    @click="$emit('CloseModalLocation')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>

            <div class="mt-3 px-6 py-4">
                <div class="w-full p-1 rounded-lg space-y-4">
                    <div class="w-full border-b border-gray-300 flex justify-start gap-x-3">
                        <button 
                            class=" cursor-pointer hover:opacity-75"
                            @click="tabs = 1"
                            :class="tabs === 1 ? 'border-b-3 border-blue-500' : 'font-extralight'">
                                Información general
                        </button>
                        <button 
                            class="cursor-pointer hover:opacity-75"
                            @click="tabs = 2"
                            :class="tabs === 2 ? 'border-b-3 border-blue-500' : 'font-extralight'">
                                Otros productos en este rack
                        </button>
                    </div>
                    <div>
                        <div v-if="tabs === 1" class="mt-6 space-y-3">
                            <div class="flex justify-between items-start bg-gray-100 border border-gray-200 space-y-2 p-2 rounded-lg">
                                <div class="flex justify-start items-center gap-x-3">
                                    <div class="bg-blue-200 text-blue-500 border border-blue-200 p-2 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brick-wall-icon lucide-brick-wall"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M16 15v6"/><path d="M16 3v6"/><path d="M3 15h18"/><path d="M3 9h18"/><path d="M8 15v6"/><path d="M8 3v6"/></svg>
                                    </div>
                                    <div class="p-0">
                                        <p class="font-semibold text-lg"> 
                                            SKU-100 
                                                <span class="block text-sm font-extralight"> Barry </span>
                                        </p>
                                    </div>
                                </div>
                                <div class="inline-flex justify-between items-center gap-x-3">
                                    <span class="font-extralight text-sm"> Quedan </span>
                                    <span class="bg-green-500 text-white px-2 py-0.5 rounded-xl"> 6 </span>
                                </div>
                            </div>
                            <div class="mt-8">
                                <p class="text-gray-400 text-lg"> Información Rack </p>
                                <div class="flex justify-between items-center mt-3 border-b border-dashed border-gray-200 space-y-2">
                                    <span class="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shelving-unit-icon lucide-shelving-unit"><path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/><path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 22V2"/><path d="M4 12h16"/><path d="M4 20h16"/><path d="M4 2v20"/><path d="M4 4h16"/></svg>
                                    </span>
                                    <span class="font-bold text-xl"> Rack E2 </span>
                                </div>
                                
                                <div class="flex justify-between items-center mt-3">
                                    <span class="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot-icon lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>
                                    </span>
                                    <span class="font-bold text-xl"> Merma </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="tabs === 2" class="mt-6">
                            <div class="flex justify-between items-center border-b border-gray-200 border-dashed mt-8">
                                <span class="mb-2"> SKU-300 </span>
                                <span class="mb-2"> Barry </span>
                            </div>
                            <div class="flex justify-between items-center border-b border-gray-200 border-dashed">
                                <span class="mb-2"> SKU-400 </span>
                                <span class="mb-2"> Barry </span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="mb-2"> SKU-500 </span>
                                <span class="mb-2"> Barry </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center gap-x-4 px-6 py-4 bg-white dark:bg-dark shrink-0 sticky bottom-0 mt-4">
                <button 
                    class="px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer hover:opacity-75"
                    @click="$emit('CloseModalLocation')"> 
                        Cerrar 
                </button>
            </div>

        </div>
    </div>
</template>