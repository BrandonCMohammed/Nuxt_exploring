<script setup lang="ts">
const toast = useToast()
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRouter } from 'vue-router'
const router = useRouter()


const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const fields = ref<Array<{
  name: string
  type: 'email' | 'password' | 'text' | 'checkbox' | 'select' | 'otp'
  label: string
  defaultValue?: any
}>>([
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    defaultValue: ''
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    defaultValue: ''
  }
])


async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formValues = event.data  // <-- actual { email, password } object

  type LoginResponse = { success: boolean; message: string }

  try {
    const res = await $fetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: formValues
    })

    if (res.success) {
      toast.add({
        title: 'Login Successful',
        description: 'Redirecting to database page...',
        color: 'success'
      })
      router.push('/databaseData')
    } else {
      toast.add({
        title: 'Login Failed',
        description: res.message,
        color: 'error'
      })
    }
  } catch (err: any) {
    toast.add({ title: 'Error', description: err.message, color: 'error' })
  }
}


</script>

<template>
  <UPage class="flex items-center justify-center">
    <UPageSection >
      <UAuthForm class="space-y-4 flex justify-center flex-col items-center max-w-full"  title="Login" :fields="fields" @submit="onSubmit"/>

    </UPageSection>
  </UPage>
</template>
