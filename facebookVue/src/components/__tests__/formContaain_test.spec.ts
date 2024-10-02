import {flushPromises, mount} from '@vue/test-utils';
import { it, describe, expect, beforeEach, vi } from 'vitest';
import FormContain from '@/components/FormContain.vue';
import { useRouter } from 'vue-router';
import InputMail from "../InputMail.vue";


vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
}));

const mockPush = vi.fn();

describe('FormContain', () => {
    let wrapper;
    let mockRouter;
    beforeEach(() => {
        vi.mock("vue-i18n");
        vi.mock("vue-router");
        mockRouter = {
            push: vi.fn()
        };

        vi.mocked(useRouter).mockReturnValue(mockRouter);
        wrapper = mount(FormContain, {
        });
    });

    it('should exist', async () => {
        expect(wrapper.findComponent(FormContain).exists()).toBe(true);
    });

    it('fills and submits the form successfully', async () => {
        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('jojo');

        const inputLastname = wrapper.get('[data-test="inputLastname"]').find('input')
        await inputLastname.setValue('rhayanne');

        await wrapper.findComponent(InputMail).setValue('jojo@example.com');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password@');

        const inputConfirmPassword = wrapper.get('[ data-test="inputConfirmPassWord"]').find('input')
        await  inputConfirmPassword.setValue('password@')

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });

    it('should display an error message if the password is incorrect', async () => {
        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('jojo');

        const inputLastname = wrapper.get('[data-test="inputLastname"]').find('input')
        await inputLastname.setValue('rhayanne');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password');

        await wrapper.findComponent(InputMail).setValue('jojo@example.com');

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('small.text-red-700').text()).toBe('message.passwordInvalid');
    });

    it('should display an error message if the ConfirmPassword is incorrect', async () => {
        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('jojo');

        const inputLastname = wrapper.get('[data-test="inputLastname"]').find('input')
        await inputLastname.setValue('rhayanne');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password@');

        await wrapper.findComponent(InputMail).setValue('jojo@example.com');

        const inputConfirmPassword = wrapper.get('[ data-test="inputConfirmPassWord"]').find('input')
        await  inputConfirmPassword.setValue('DifferentPassword@')

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('small.text-red-700').text()).toBe('message.confirmPasswordInvalid');
    });

    it('should display an error message if at least one form field is empty', async () => {
        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('');

        const inputLastname = wrapper.get('[data-test="inputLastname"]').find('input')
        await inputLastname.setValue('rhayanne');

        await wrapper.findComponent(InputMail).setValue('jojo@example.com');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password@');

        const inputConfirmPassword = wrapper.get('[ data-test="inputConfirmPassWord"]').find('input')
        await  inputConfirmPassword.setValue('password@')


        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('small.text-red-700').text()).toBe('message.firstNameRequired');
    });


});