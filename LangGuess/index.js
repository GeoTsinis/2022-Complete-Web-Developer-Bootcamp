import {franc} from 'franc';
import langs from 'langs';
import colors from 'colors';

const input = process.argv[2];
const langCode = franc(input);

if(langCode === 'und') {
    console.log('Sorry, I cant find the language, try with more words'.red);
} else {
    const language = langs.where('3',langCode);
    console.log(`'My best guess is: ${language.name}`.green)
}

