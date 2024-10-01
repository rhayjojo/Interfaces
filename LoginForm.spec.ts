import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import LoginForm from "@/views/auth/LoginForm.vue";
import { useAccountStore } from "@/stores/account";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
import TextInput from "@/components/form/TextInput.vue";
import PasswordInput from "@/components/form/PasswordInput.vue";
import { stubIntersectionObserver } from "../commons";

stubIntersectionObserver();

describe("LoginForm", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let mockRouter;
  vi.mocked(IntersectionObserver);

  beforeEach(() => {
    vi.mock("vue-i18n");
    vi.mock("vue-router");
    mockRouter = {
      push: vi.fn() //ici on mock la fonction push
    };

    vi.mocked(useRouter).mockReturnValue(mockRouter); // ici on retourne le mock
    pinia = createTestingPinia({
      createSpy: vi.fn()
    });
    useAccountStore(pinia).loginAccount = vi.fn().mockReturnValue({
      error: "",
      data: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    });
    wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    });
  });
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("shows error for empty username", async () => {
    await wrapper.find('[data-test="input-username"]').setValue("");
    await wrapper.find('[data-test="input-password"]').setValue("password123@");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledTimes(0);
    const textInput = wrapper.findComponent(TextInput);
    expect(textInput.props().errors![0].$message).toBe("validation.username.required");
  });

  it("shows error for empty password", async () => {
    await wrapper.find('[data-test="input-username"]').setValue("username");
    await wrapper.find('[data-test="input-password"]').setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledTimes(0);
    expect(wrapper.findComponent(PasswordInput).props().errors).toBe(
      "validation.password.required"
    );
  });

  it("submits the form when data is valid", async () => {
    await wrapper.find('[data-test="input-username"]').setValue("testuser");
    await wrapper.find('[data-test="input-password"]').setValue("password123@");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledTimes(1);
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123@"
    });

    expect(wrapper.find('[data-test="error-login-message"]').exists()).toBe(false);
    expect(mockRouter.push).toHaveBeenCalledWith("/"); //ici on peux utiliser le push
  });

  it("should handles login error", async () => {
    pinia = createTestingPinia({
      createSpy: vi.fn()
    });
    const mockError = "MARKET_PLACE-3002";
    useAccountStore(pinia).loginAccount = vi.fn().mockReturnValue({
      error: mockError,
      data: ""
    });
    wrapper = mount(LoginForm, {
      global: {
        plugins: [pinia]
      }
    });
    await wrapper.find('[data-test="input-username"]').setValue("userNotExist");
    await wrapper.find('[data-test="input-password"]').setValue("password123@");
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledTimes(1);
    expect(useAccountStore(pinia).loginAccount).toHaveBeenCalledWith({
      username: "userNotExist",
      password: "password123@"
    });
    const error = wrapper.find('[data-test="error-login-message"]');
    expect(error.text()).toBe("errors.user_not_found");
  });
});
