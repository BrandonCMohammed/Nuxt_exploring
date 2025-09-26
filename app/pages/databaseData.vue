<script lang="ts" setup>
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

const showModal = ref(false)
const id = ref<number | null>(null)
const email = ref('')
const password = ref('')

const { data, error, refresh } = await useFetch('/api/testdb')
if (error.value) {
  console.error('Error fetching data:', error.value)
}
const toast = useToast()
const { copy } = useClipboard()


const columns: TableColumn<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'password',
    header: 'Password'
  },
  {
    id: 'action'
  }
]

function getDropdownActions(data: any): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit',
        onSelect: async () => {
          showModal.value = true
          console.log(data)
          id.value = data.id
          email.value = data.email
          password.value = data.password
        }
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: async () => {
          await $fetch(`/api/${data.id}`, {
            method: 'DELETE'
          })
          toast.add({ title: 'Deleted', description: `Entry with ID ${data.id} has been deleted.`, color: 'error' })
          await refresh()
        }
      }
    ]
  ]
}

async function updateRecord() {
  if (id.value === null) return
  await $fetch(`/api/${id.value}`, {
    method: 'PUT',
    body: {
      email: email.value,
      password: password.value
    }
  })
  toast.add({ title: 'Updated', description: `Entry with ID ${id.value} has been updated.`, color: 'success' })
  showModal.value = false
  await refresh()
}
</script>

<template>


  <UModal v-model:open="showModal" title="Update"
    description="Update the entry" size="md" placement="center">
    <!-- <UButton label="Open" color="neutral" variant="subtle" /> -->

    <template #content class="h-48 p-4">
      <UFormField label="ID">
        <UInput :value="id" disabled />
      </UFormField>
      <UFormField label="Email">
        <UInput placeholder="Enter your email" v-model="email"/>
      </UFormField>
      <UFormField label="Password" v-model="password">
        <UInput placeholder="Enter your password" />
      </UFormField>
      <UButton label="Update" color="primary" @click="updateRecord" class="mt-4" />
    </template>
  </UModal>


  <UPage>
    <UPageSection>
      <UTable :data="data" :columns="columns" class="flex-1">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg"
              :alt="`${row.original.name} avatar`" />
            <div>
              <p class="font-medium text-highlighted">
                {{ row.original.name }}
              </p>
              <p>
                {{ row.original.position }}
              </p>
            </div>
          </div>
        </template>
        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
          </UDropdownMenu>
        </template>
      </UTable>
    </UPageSection>
  </UPage>
</template>
