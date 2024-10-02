import {mount} from '@vue/test-utils'
import {it, expect, beforeEach, describe, flushPromises} from 'vitest'
import InputAgeUser from "../InputAgeUser.vue";

describe('test of InputAgeUser.vue', () =>{
    let wrapper :vueWrapper
    beforeEach(()=>{
        wrapper = mount(InputAgeUser)
    })


    it('renders correctly with initial values', () => {
        expect(wrapper.html()).toContain('Jan')
        expect(wrapper.html()).toContain('1')
        expect(wrapper.html()).toContain('1980')
    })

    it('emits updateBirthDay when month is changed', async () => {
        const monthListbox = wrapper.findAll('[data-test="ListBox-month"]').at(1);
        expect(monthListbox.exists()).toBe(true);
        await monthListbox.trigger('click');
        const february = wrapper.findAll('li')[1];
        expect(february.exists()).toBe(true);

        await february.trigger('click');
        await flushPromises
        expect(wrapper.emitted('updateBirthDay')).toBeTruthy();
        expect(wrapper.emitted('updateBirthDay')[0]).toEqual([{ day: 1, year: 1980, month: 'Feb' }]);
    });


    it('emits updateBirthDay when day is changed', async () => {
        const dayListbox = wrapper.find('[data-test="ListBox-day"]')
        await dayListbox.trigger('click')

        const day15 = wrapper.find('[data-test="day-15"]')
        await day15.trigger('click')

        await flushPromises

        expect(wrapper.emitted('updateBirthDay')).toBeTruthy()
        expect(wrapper.emitted('updateBirthDay')[0]).toEqual([{ day: 15, year: 1980, month: 'Jan' }])
    })

    it('emits updateBirthDay when year is changed', async () => {
        const yearListbox = wrapper.find('[data-test="ListBox-year"]')
        await yearListbox.trigger('click')

        const year2023 = wrapper.find('[data-test="year-2023"]')
        await year2023.trigger('click')

        await flushPromises

        expect(wrapper.emitted('updateBirthDay')).toBeTruthy()
        expect(wrapper.emitted('updateBirthDay')[0]).toEqual([{ day: 1, year: 2023, month: 'Jan' }])
    })

});

