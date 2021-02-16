
const maskCnpj = [
    /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '/',
    /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/,
];

const maskCpf = [
    /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, '-',
    /\d/, /\d/,
];

const maskPhoneHome = [
    '(', /\d/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

const maskPhoneMobile = [
    '(', /[1-9]/, /[1-9]/, ')', ' ',
    /[1-9]/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

const cnpj = (value) => maskCnpj;

const cpf = (value) => maskCpf;

const phone = (value) => value.length !== 10 ? maskPhoneMobile : maskPhoneHome;

export default {
    cnpj,
    phone,
    cpf,
}