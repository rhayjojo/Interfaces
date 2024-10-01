import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import ConfirmInput from "../ConfirmInput.vue";

test('should emit update:modelValue on input', async () =>{
    const wrapper = mount(ConfirmInput, {
        props: {
            modelValue: '',
            errormessage: ''
        }
    } )

    const confirmPassword = wrapper.get('[data-test="confirmPassword"]')
    await confirmPassword.setValue('jo200455')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['jo200455'])
})

test('should apply the correct class based on errormessage prop', async () =>{
    const wrapper = mount(ConfirmInput, {
        props: {
            modelValue: '',
            errormessage: 'This field is required'
        }
    })

    const confirmPassword = wrapper.get('[data-test="confirmPassword"]')
    expect(confirmPassword.classes()).toContain('focus:border-red-700')
    expect(confirmPassword.classes()).toContain('border-red-700')
    await wrapper.setProps({errormessage: false})
    expect(confirmPassword.classes()).toContain('focus:border-sky-400')
})

test('should mask and show confirmPassword', async () =>{
    const wrapper = mount(ConfirmInput, {
        props:{
            modelValue: '',
            errormessage: 'This field is required'
        }
    })

    const confirmPassword = wrapper.get('[data-test="confirmPassword"]')
    await confirmPassword.setValue('jo200455')

    expect(confirmPassword.attributes('type')).toBe('password')

    const toggleButton = wrapper.get('#toggle-confirmPassword')
    await toggleButton.trigger('click')

    expect(confirmPassword.attributes('type')).toBe('text')

    expect(wrapper.findComponent({ name: 'EyeSlashIcon' }).exists()).toBe(false)
    await toggleButton.trigger('click')

    expect(confirmPassword.attributes('type')).toBe('password')

    expect(wrapper.findComponent({ name: 'EyeIcon' }).exists()).toBe(false)


})
