import { mount } from '@vue/test-utils'
import {it, expect, beforeEach, describe} from 'vitest'
import InputPassWord from "../InputPassWord.vue";


describe('InputPassWord', () =>{
    let wrapper
    beforeEach(() =>{
         wrapper = mount(InputPassWord, {
            props: {
                errormessage: 'detect one error here'
            }
        } )
    })

    it("should render correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should emit update:modelValue on input password', async () =>{
        const inputPassWord = wrapper.find('input')
        await inputPassWord.setValue('password@');

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['password@'])
    })

    it('should apply the correct class based on errormessage prop', async () =>{

        const inputPassWord = wrapper.find('input')
        expect(inputPassWord.classes()).toContain('focus:border-red-700')
        expect(inputPassWord.classes()).toContain('border-red-700')
        await wrapper.setProps({errormessage: ''})
        expect(inputPassWord.classes()).toContain('focus:border-sky-400')
    })

    it.only('should mask and show password', async () =>{

        const inputPassWord = wrapper.find('input')
        await inputPassWord.setValue('password@');

        expect(inputPassWord.attributes('type')).toBe('password')

        const toggleButton = wrapper.get('#toggle-password')
        await toggleButton.trigger('click')

        expect(inputPassWord.attributes('type')).toBe('text')

        expect(wrapper.findComponent({ name: 'EyeSlashIcon' }).exists()).toBe(false)
        await toggleButton.trigger('click')

        expect(inputPassWord.attributes('type')).toBe('password')

        expect(wrapper.findComponent({ name: 'EyeIcon' }).exists()).toBe(false)


    })
})




