import { mount } from '@vue/test-utils'
import {test, expect, beforeEach, describe} from 'vitest'
import InputAgeUser from "../InputAgeUser.vue";

describe('test of InputAgeUser.vue', () =>{
    let wrapper;
    beforeEach(() => {
        wrapper = mount(InputAgeUser);
    });
    test('should emit "updateBirthDay" event when a new day, month, or year is selected', async () => {

        const month =  wrapper.get('[data-test="ListBox-month"]');
        await month.trigger('click');

        const options = wrapper.get('[data-test="ListBox-monthOption"]');
        await options.trigger('click');

        const emittedEvent = wrapper.emitted()['updateBirthDay'][0][0];
        expect(emittedEvent.month).toEqual('Mar');
    });
});

