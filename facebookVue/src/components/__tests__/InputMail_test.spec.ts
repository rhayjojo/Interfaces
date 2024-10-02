import { mount } from '@vue/test-utils'
import {test, expect, describe, beforeEach} from 'vitest'
import InputMail from "../InputMail.vue";
describe('InputMail', () =>{
    let wrapper
    beforeEach(() =>{

         wrapper = mount(InputMail, {
            props: {
                modelValue: '',
                errormessage: 'This field is required'
            }
        })

    })
    test('should emit update:modelValue on input', async () =>{

        const email = wrapper.get('[data-test="email"]')
        await email.setValue('rhayjojo@gmail.com')

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['rhayjojo@gmail.com'])
    })

    test('should apply the correct class based on errormessage prop', async () =>{

        const email = wrapper.get('[data-test="email"]')
        expect(email.classes()).toContain('focus:border-red-700')
        expect(email.classes()).toContain('border-red-700')
        await wrapper.setProps({errormessage: ''})
        expect(email.classes()).toContain('focus:border-sky-400')
    })
})
