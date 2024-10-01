import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import inputLastName from '../InputLastName.vue'

test('should emit update:modelValue on input', async () =>{
    const wrapper = mount(inputLastName, {
        props: {
            modelValue: '',
            errormessage: ''
        }
    } )

    const lastname = wrapper.get('[data-test="lastname"]')
    await lastname.setValue('rhayanne')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['rhayanne'])
})

test('should apply the correct class based on errormessage prop', async () =>{
    const wrapper = mount(inputLastName, {
        props: {
            modelValue: '',
            errormessage: 'This field is required'
        }
    })

    const lastname = wrapper.get('[data-test="lastname"]')
    expect(lastname.classes()).toContain('focus:border-red-700')
    expect(lastname.classes()).toContain('border-red-700')
    await wrapper.setProps({errormessage: ''})
    expect(lastname.classes()).toContain('focus:border-sky-400')
})