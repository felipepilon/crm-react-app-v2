import StringMask from 'string-mask'

var maskCnpj = new StringMask('00.000.000/0000-00');
var maskCpf = new StringMask('000.000.000-000');
var maskPhoneHome = new StringMask('(00) 0000 0000');
var maskPhoneMobile = new StringMask('(00) 0 0000 0000');
var zipMask = new StringMask('00000-000');

const cnpj = (value) => maskCnpj.apply(value);

const cpf = (value) => maskCpf.apply(value);

const zip = (value) => zipMask.apply(value);

const timer = (value) => {
    const days = Math.floor(value / (1000 * 60 * 60 * 24));
    const hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((value % (1000 * 60 * 60)) / (60));
    const seconds = Math.floor((value % (1000 * 60)));

    return (
        days ? days + ':' : '' +
        ('00' + hours).slice(-2) + ':' +
        ('00' + minutes).slice(-2) + ':' +
        ('00' + seconds).slice(-2)
    );
};

const phone = (value) => value ? (value.length > 10 ? maskPhoneMobile.apply(value) : maskPhoneHome.apply(value)) : '';

export default {
    cnpj,
    cpf,
    phone,
    zip,
    timer,
}