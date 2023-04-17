import {render, fireEvent, screen} from '@testing-library/vue';
import LoginForm from '@/components/form/LoginForm.vue';

describe('test all component functionality', () => {
  it('render: component is rendering correctly', () => {
    render(LoginForm);
    expect(screen.getByText('Entre na sua conta')).toBeDefined();
  });

  it('validator: test form validator', async () => {
    render(LoginForm);
    
    const loginBtn = screen.getByText('Fazer Login');
    const emailInput = document.querySelector('input#email');
    const passwordInput = document.querySelector('input#password');

    // Set incorrect values
    await fireEvent.update(emailInput, 'invalid-email');
    await fireEvent.update(passwordInput, '');
    await fireEvent.click(loginBtn);

    expect(screen.getByText('Insira um e-mail válido')).toBeDefined();
    expect(screen.getByText('Insira uma senha válida')).toBeDefined();

    // Update with valide values
    await fireEvent.update(emailInput, 'example@gmail.com');
    await fireEvent.update(passwordInput, '123456789');

    expect(document.querySelector('.help-text.error')).toBeNull();
  });
});
