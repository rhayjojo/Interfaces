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
            global: {
                stubs: {
                    InputFirstName: true,
                    InputPassWord: true,
                    buttonLogin: true,
                },
            },
        });
    });

    it('should display validation errors when form is submitted empty', async () => {
        await wrapper.find('form').trigger('submit.prevent');
        await nextTick();

        expect(wrapper.text()).toContain('message.firstNameRequired');
        expect(wrapper.text()).toContain('message.passwordRequired');
    });

    it('should display error message when credentials are wrong', async () => {
        localStorage.setItem('user', JSON.stringify({
            firstName: 'correctUser',
            password: 'correctPassword!123',
        }));


        await wrapper.findComponent({ name: 'InputFirstName' }).setValue('jojo');
        await wrapper.findComponent({ name: 'InputPassWord' }).setValue('P@ssw0rd!');
        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        const errorMessage = wrapper.find('p')
        expect(errorMessage.text()).toBe('message.errorMessage');
    });

    it('should redirect to home when credentials are correct', async () => {
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
