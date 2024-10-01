import {flushPromises, mount} from '@vue/test-utils';
import { test, describe, expect, beforeEach, vi } from 'vitest';
import formContain from '@/components/formContain.vue';
import { useRouter } from 'vue-router';


vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
}));

const mockPush = vi.fn();

describe('formContain.vue', () => {
    let wrapper;
    let mockRouter;
    beforeEach(() => {
        vi.mock("vue-i18n");
        vi.mock("vue-router");
        mockRouter = {
            push: vi.fn()
        };

        vi.mocked(useRouter).mockReturnValue(mockRouter);
        wrapper = mount(formContain, {
        });
    });

    test('displays validation errors when form is submitted with empty fields', async () => {
        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('[data-test="firstName"]').text()).toBe('message.firstNameRequired');
        expect(wrapper.find('small.text-red-700').exists()).toBe(true);
    });

    test('fills and submits the form successfully', async () => {
        await wrapper.findComponent({ name: 'InputFirstName' }).setValue('jojo');
        await wrapper.findComponent({ name: 'InputLastName' }).setValue('rhayanne');
        await wrapper.findComponent({ name: 'InputMail' }).setValue('jojo@example.com');
        await wrapper.findComponent({ name: 'InputPassWord' }).setValue('P@ssw0rd!');
        await wrapper.findComponent({ name: 'ConfirmInput' }).setValue('P@ssw0rd!');

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });

    test('validates password mismatch', async () => {
        await wrapper.findComponent({ name: 'InputFirstName' }).setValue('jojo');
        await wrapper.findComponent({ name: 'InputLastName' }).setValue('rhayanne');
        await wrapper.findComponent({ name: 'InputMail' }).setValue('jojo@example.com');
        await wrapper.findComponent({ name: 'InputPassWord' }).setValue('P@ssw0rd!');
        await wrapper.findComponent({ name: 'ConfirmInput' }).setValue('DifferentPassword@');

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.find('small.text-red-700').text()).toBe('message.confirmPasswordInvalid');
    });
});