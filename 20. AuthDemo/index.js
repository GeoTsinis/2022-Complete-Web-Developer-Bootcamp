const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12); //the bigger the num the more time it takes to generate the salt
    const hash = await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}

// 2ND METHOD - SHORTER
// const hashPassword = async (pw) => {
//     const hash = await bcrypt.hash(pw,12;
//     console.log(hash);
// }

const login = async (pw, hashedPw) => {
   const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED IN.")
    } else {
        console.log("INCORRECT")
    }
}

// hashPassword('monkey');
login('monkey', '$2b$12$ekTXBvu.YgBDDP3l1NsxEur2sRc.V2bSYvdI34ss2kbhWPfGiit.e');