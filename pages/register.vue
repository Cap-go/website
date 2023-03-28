<template>
<!-- window.Rewardful.affiliate -->
<div class="h-screen">
    <!-- add loading text centered with tailwindcss -->
  <div class="flex justify-center items-center h-full">
        <p class="text-2xl">Loading...</p>
        </div>
        
</div>
</template>
<script setup lang="ts">
    // onMounted
    onMounted(() => {
        // check if window.Rewardful.affiliate present if yes then add it to the register link
        const affiliate = window?.Rewardful?.affiliate.token
        const registerLink = affiliate ? `https://web.capgo.app/register?via=${affiliate}` : 'https://web.capgo.app/register'
        // redirect to register link
        window.open(registerLink, '_self')
    })
</script>