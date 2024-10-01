import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import InputPassWord from "../InputPassWord.vue";

test('should emit update:modelValue on input', async () =>{
    const wrapper = mount(InputPassWord, {
        props: {
            modelValue: '',
            errormessage: ''
        }
    } )

    const password = wrapper.get('[data-test="password"]')
    await password.setValue('jo200455')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['jo200455'])
})

test('should apply the correct class based on errormessage prop', async () =>{
    const wrapper = mount(InputPassWord, {
        props: {
            modelValue: '',
            errormessage: 'This field is required'
        }
    })

    const password = wrapper.get('[data-test="password"]')
    expect(password.classes()).toContain('focus:border-red-700')
    expect(password.classes()).toContain('border-red-700')
    await wrapper.setProps({errormessage: false})
    expect(password.classes()).toContain('focus:border-sky-400')
})

test('should mask and show password', async () =>{
    const wrapper = mount(InputPassWord, {
        props:{
            modelValue: '',
            errormessage: 'This field is required'
        }
    })

    const password = wrapper.get('[data-test="password"]')
    await password.setValue('jo200455')

    expect(password.attributes('type')).toBe('password')

    const toggleButton = wrapper.get('#toggle-password')
    await toggleButton.trigger('click')

    expect(password.attributes('type')).toBe('text')

    expect(wrapper.findComponent({ name: 'EyeSlashIcon' }).exists()).toBe(false)
    await toggleButton.trigger('click')

    expect(password.attributes('type')).toBe('password')

    expect(wrapper.findComponent({ name: 'EyeIcon' }).exists()).toBe(false)


})

