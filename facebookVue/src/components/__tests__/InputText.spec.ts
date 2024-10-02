import { mount } from '@vue/test-utils'
import {it, expect, describe, beforeEach} from 'vitest'
import InputText from "../inputText.vue";

describe('InputText', () =>{
    let wrapper
    beforeEach(() =>{
        wrapper = mount(InputText, {
            props: {
                modelValue: '',
                errormessage: 'This field is required'
            }
        } )
    })
    it("should render correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should emit update:modelValue on input firstname', async () =>{
        const firstname = wrapper.get('[data-test="inputText"]')
        await firstname.setValue('Jojo')

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Jojo'])
    })

    it('should should apply the correct class based on errormessage prop from firstname input', async () => {
        const firstname = wrapper.get('[data-test="inputText"]')
        expect(firstname.classes()).toContain('border-red-700')
        expect(firstname.classes()).toContain('focus:border-red-700')
        await wrapper.setProps({ errormessage: '' })
        expect(firstname.classes()).toContain('focus:border-sky-400')
    });

    it('should should emit update:modelValue on input lastname ', async () => {
        const lastname = wrapper.get('[data-test="inputText"]')
        await lastname.setValue('rhayanne')

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['rhayanne'])
    });

    it('should should apply the correct class based on errormessage prop from lastname input', async () => {
        const lastname = wrapper.get('[data-test="inputText"]')
        expect(lastname.classes()).toContain('border-red-700')
        expect(lastname.classes()).toContain('focus:border-red-700')
        await wrapper.setProps({ errormessage: '' })
        expect(lastname.classes()).toContain('focus:border-sky-400')
    });


})


