<template>
  <div class="flex gap-2 justify-center mt-3 ml-1 max-w-[97%] text-black">
    <div class="top-16 z-10 w-[97%]">
      <Listbox v-model="birthDay.month" @click="updateBirthDay" data-test="ListBox-month">
        <div class="relative mt-1">
          <ListboxButton
              class="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-200 sm:text-sm"
          >
            <span class="block truncate">{{ birthDay.month }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
                data-test="ListBox-monthOption"
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="month in months"
                  :key="month"
                  :value="month"
                  as="template"
              >
                <li
                    :class="[
                      active ? 'bg-blue-100 text-blue-900' : 'ring-offset-blue-200',
                      'relative cursor-default select-none',
                    ]"
                >
                    <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                      {{ month }}
                    </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <div class="top-16 z-10 w-[97%]">
      <Listbox v-model="birthDay.day" @click="updateBirthDay">
        <div class="relative mt-1">
          <ListboxButton
              class="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-200 sm:text-sm"
          >
            <span class="block truncate">{{ birthDay.day }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
          </ListboxButton>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="day in availableDays"
                  :key="day"
                  :value="day"
                  as="template"
              >
                <li
                    :class="[
                      active ? 'bg-blue-100 text-blue-900' : 'ring-offset-blue-200',
                      'relative cursor-default select-none ',
                    ]"
                >
                    <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                      {{ day }}
                    </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <div class="top-16 z-10 w-[97%]">
      <Listbox v-model="birthDay.year" @click="updateBirthDay">
        <div class="relative mt-1">
          <ListboxButton
              class="relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-200 sm:text-sm"
          >
            <span class="block truncate">{{ birthDay.year }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
          </ListboxButton>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="year in years"
                  :key="year"
                  :value="year"
                  as="template"
              >
                <li
                    :class="[
                      active ? 'bg-blue-100 text-blue-900' : 'ring-offset-blue-200',
                      'relative cursor-default select-none',
                    ]"
                >
                    <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                      {{ year }}
                    </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, reactive } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits()

const birthDay = reactive({
  day: 1,
  year: 1980,
  month: 'Jan'
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const availableDays = computed(() => {
  if (['Apr', 'Jun', 'Sep', 'Nov'].includes(birthDay.month)) {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  } else if (birthDay.month === 'Feb') {
    return Array.from({ length: 29 }, (_, i) => i + 1);
  } else {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }
});

const years = Array.from({ length: 2025 - 1980 }, (_, i) => 1980 + i)

const updateBirthDay = () => {
  console.log("Selected birthDay before emit:", birthDay);
  emit('updateBirthDay', { ...birthDay });
  console.log("Event emitted: updateBirthDay with value:", birthDay);
}
</script>



