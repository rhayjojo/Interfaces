import {flushPromises, mount} from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Login from '@/views/login.vue';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
}));

const mockPush = vi.fn();

describe('Login.vue', () => {
    let wrapper: any;
    let mockRouter;
    beforeEach(() => {
        vi.mock("vue-i18n");
        vi.mock("vue-router");
        mockRouter = {
            push: vi.fn()
        };
        vi.mocked(useRouter).mockReturnValue(mockRouter);
        wrapper = mount(Login, {
        });
    });

    it('should exist', async () => {
        expect(wrapper.findComponent(Login).exists()).toBe(true);
    });

    it('should display an error message if at least one form field is empty', async () => {
        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password@');

        await wrapper.find('form').trigger('submit.prevent');
        await nextTick();

        expect(wrapper.find('small.text-red-700').text()).toBe('message.firstNameRequired');
    });

    it('should display error message when credentials are wrong', async () => {
        localStorage.setItem('user', JSON.stringify({
            firstName: 'correctUser',
            password: 'correctPassword!123',
        }));


        const inputFirstname = wrapper.get('[data-test="inputFirstname"]').find('input')
        await inputFirstname.setValue('jojo');

        const inputPassWord = wrapper.get('[data-test="inputPassWord"]').find('input')
        await inputPassWord.setValue('password@');

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        const errorMessage = wrapper.find('p')
        expect(errorMessage.text()).toBe('message.errorMessage');
    });

    it.only('should redirect to home when credentials are correct', async () => {
        localStorage.setItem('user', JSON.stringify({
            firstName: 'correctUser',
            password: 'correctPassword!123',
        }));

        wrapper.vm.state.firstName = 'correctUser';
        wrapper.vm.state.password = 'correctPassword!123';

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        expect(mockRouter.push).toHaveBeenCalledWith("/home");
        expect(wrapper.vm.errorMessage).toBe('');
    });
});
