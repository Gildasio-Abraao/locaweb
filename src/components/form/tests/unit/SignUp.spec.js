import {render, fireEvent, screen} from '@testing-library/vue';
import SignUpForm from '@/components/form/SignUpForm.vue';

describe('test all component functionality', () => {
  it('render: component is rendering correctly', () => {
    render(SignUpForm);
    expect(screen.getByText('Informe seus dados pessoais para acesso à sua conta')).toBeDefined();
  });

  it('validator: test form validator', async () => {
    render(SignUpForm);
    
    const loginBtn = screen.getByText('CRIAR CONTA');
    const usernameInput = document.querySelector('input#username');
    const phoneInput = document.querySelector('input#phone');
    const emailInput = document.querySelector('input#email');
    const passwordInput = document.querySelector('input#password');
    const confirmPasswordInput = document.querySelector('input#confirm-password');
    const siteNameInput = document.querySelector('input#site-name');

    // Set incorrect values
    await fireEvent.update(usernameInput, 'username');
    await fireEvent.update(phoneInput, '12345678912');
    await fireEvent.update(emailInput, 'invalid-email');
    await fireEvent.update(passwordInput, 'password');
    await fireEvent.update(confirmPasswordInput, 'notsame password');
    await fireEvent.update(siteNameInput, 'sitename');

    await fireEvent.click(loginBtn);

    expect(screen.getByText('Value is not a valid email address;')).toBeDefined();
    expect(screen.getByText('The value must be equal to the other value;')).toBeDefined();

    // Update with valide values
    await fireEvent.update(emailInput, 'example@gmail.com');
    await fireEvent.update(confirmPasswordInput, 'password');

    expect(document.querySelector('.help-text.error')).toBeNull();
  });
});
