
const cnpj = [
    /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '/',
    /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/,
];

const cpf = [
    /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, '-',
    /\d/, /\d/,
];

const phoneHome = [
    '(', /\d/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

const phoneMobile = [
    '(', /[1-9]/, /[1-9]/, ')', ' ',
    /[1-9]/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

const zip = [
    /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/, /\d/
];

const InputMasks = {
    cnpj: () => cnpj,
    cpf: () => cpf,
    phone: (value) => value.length !== 10 ? phoneMobile : phoneHome,
    zip: () => zip
}

export default InputMasks;