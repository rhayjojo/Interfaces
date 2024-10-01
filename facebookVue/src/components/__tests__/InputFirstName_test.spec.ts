import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import InputFirstName from "../inputFirstName.vue";

test('should emit update:modelValue on input', async () => {
        const wrapper = mount(InputFirstName, {
            props: {
                modelValue: '',
                errormessage: ''
            }
        })
        const firstname = wrapper.get('[data-test="firstname"]')
        await firstname.setValue('Jojo')

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Jojo'])
    })

test('should apply the correct class based on errormessage prop', async () => {
        const wrapper = mount(InputFirstName, {
            props: {
                modelValue: '',
                errormessage: 'This field is required'
            }
        })

        const firstname = wrapper.get('[data-test="firstname"]')
        expect(firstname.classes()).toContain('border-red-700')
        expect(firstname.classes()).toContain('focus:border-red-700')

        await wrapper.setProps({ errormessage: '' })

        expect(firstname.classes()).toContain('focus:border-sky-400')
    })

test('should focus on input when mounted', () => {
        const wrapper = mount(InputFirstName, {
            attachTo: document.body,
            props: {
                modelValue: '',
                errormessage: ''
            }
        })

       const firstname = wrapper.get('[data-test="firstname"]')

        expect(document.activeElement).toBe(firstname.element)
        wrapper.unmount()
    })
