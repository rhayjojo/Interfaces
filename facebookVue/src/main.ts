import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

const systemLocale = (navigator.language || 'en').substring(0, 2); // On utilise seulement les deux premières lettres

const i18n = createI18n({
    legacy: false,
    locale: systemLocale,
    fallbackLocale: 'fr',
    messages: {
        en: {
            message: {
                titleRegister: 'Register to task_Manager',
                titleLogin: 'Login to task_Manager',
                errorMessage:'Wrong firstname or password!',
                firstNameRequired: 'First name is required',
                firstNameMinLength: 'First name must be at least 4 characters',
                lastNameRequired: 'Last name is required',
                lastNameMinLength: 'Last name must be at least 4 characters',
                emailRequired: 'Email is required',
                emailInvalid: 'Please enter a valid email address',
                passwordRequired: 'Password is required',
                passwordMinLength: 'Password must be at least 6 characters',
                passwordInvalid: 'Password must contain at least one special character',
                confirmPasswordRequired: 'Please confirm your password',
                confirmPasswordInvalid: 'Passwords do not match',
                registerTitle: 'Register to task_Manage',
                loginLink: 'Login',
                submit: 'Submit'
            }
        },
        fr: {
            message: {
                titleRegister:"s'inscrire sur le gestionnaire de tache",
                titleLogin:"Se connecter au gestionnaire de tache",
                errorMessage:'Prénom ou mot de passe incorrect !',
                firstNameRequired: 'Le prénom est requis',
                firstNameMinLength: 'Le prénom doit comporter au moins 4 caractères',
                lastNameRequired: 'Le nom est requis',
                lastNameMinLength: 'Le nom doit comporter au moins 4 caractères',
                emailRequired: 'L\'email est requis',
                emailInvalid: 'Veuillez entrer une adresse e-mail valide',
                passwordRequired: 'Le mot de passe est requis',
                passwordMinLength: 'Le mot de passe doit comporter au moins 6 caractères',
                passwordInvalid: 'Le mot de passe doit contenir au moins un caractère spécial',
                confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
                confirmPasswordInvalid: 'Les mots de passe ne correspondent pas',
                registerTitle: 'Inscription à task_Manage',
                loginLink: 'Connexion',
                submit: 'Soumettre'
            }
        }
    }
});

const app = createApp(App);

window.addEventListener('languagechange', () => {
    const newLocale = navigator.language.substring(0, 2); // Nouvelle langue du système avec deux lettres
    i18n.global.locale.value = newLocale; // Mise à jour de la langue dans i18n
});

app.use(i18n);
app.use(router);

// Montage de l'application
app.mount('#app');


