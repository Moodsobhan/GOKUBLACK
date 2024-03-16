const fs = require("fs");

module.exports = {
  config: {
    name: "bankv2",
    description: "Deposit or withdraw money from the bank and earn interest",
    guide:{
      vi: "",
      en: "Bankv2:\nInterest - Balance - Withdraw - Deposit - Transfer - Richest"
    },
    category: "economy",
    countDown: 5,
    role: 0,
    author: "Loufi | SiAM"
  },
  onStart: async function ({ args, message, event,api, usersData }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);
  
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const info = await api.getUserInfo(user);
			const username = info[user].name;
    const bankData = JSON.parse(fs.readFileSync("scripts/cmds/assets/bank.json", "utf8"));

    if (!bankData[user]) {
      bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));
    }

    const command = args[0]?.toLowerCase();
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);

    switch (command) {
      case "deposit":
        if (isNaN(amount) || amount <= 0) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏Please enter a valid amount 🔁•");
        }
        if (userMoney < amount) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏You don't have the required amount✖️•");
        }

        bankData[user].bank += amount;
        await usersData.set(event.senderID, {
          money: userMoney - amount
        });
        fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

        return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Successfully deposited ${amount} $ into your bank account✅•`);

      case "withdraw":
        const balance = bankData[user].bank || 0;

        if (isNaN(amount) || amount <= 0) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏Please enter the correct amount 😪");
        }

        if (amount > balance) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏The requested amount is greater than the available balance in your bank account...🗿");
        }

        bankData[user].bank = balance - amount;
        await usersData.set(event.senderID, {
          money: userMoney + amount
        });
        fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

        return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Successfully withdrew ${amount}$ from your bank account•`);

      case "balance":
        const bankBalance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank : 0;
        return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Your bank balance is: ${bankBalance}$ •\n❏To withdraw money.\n type:\n${p}Bank Withdraw 'your withdrawal amount'•\n❏To earn interest\ntype:\n${p}Bank Interest•`);

      case "interest":
        const interestRate = 0.001; // 0.1% daily interest rate
        const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();
        const currentTime = Date.now();
        const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
        const interestEarned = bankData[user].bank * (interestRate / 970) * timeDiffInSeconds;
        if (bankData[user].bank <= 0) {
    return message.reply("[🏦 Bank Bot 🏦]\n\n❏You don't have any money in your bank account to earn interest.💸🥱");
        }

        bankData[user].lastInterestClaimed = currentTime;
        bankData[user].bank += interestEarned;

        fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

        return message.reply(`[🏦 Bank Bot 🏦]\n\n❏You have earned interest of ${interestEarned.toFixed(2)} $ . It has been successfully added to your account balance..✅`);

      case "transfer":
        const senderBalance = bankData[user].bank || 0;

        if (isNaN(amount) || amount <= 0) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏Please enter the amount you want to transfer...🗿😪");
        }

        if (senderBalance < amount) {
          return message.reply("[🏦 Bank Bot 🏦]\n\n❏The amount is not available in your bank account•");
        }

        if (isNaN(recipientUID)) {
          return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Please write:\n⭔ ${p}Bankv2 Transfer followed by the amount and the recipient's ID {uid}•\nExample:\n${p}Bankv2 Transfer 5000 289272210979`);
        }

        if (!bankData[recipientUID]) {
          bankData[recipientUID] = { bank: 0, lastInterestClaimed: Date.now() };
          fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));
        }

        bankData[user].bank -= amount;
        bankData[recipientUID].bank += amount;

        fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

        const Ruser = await api.getUserInfo(recipientUID);
			const Rname = Ruser[recipientUID].name;
        const recipientMessage = `[🏦 Bank Bot 🏦]\n\n❏You have received ${amount}$\nFrom:\n❏Name: ${username}\n❏BankID: ${user}.\n❏ Your current Bank balance:\n${bankData[recipientUID].bank}$\n\n-Alessia Bank✅`;
  await api.sendMessage(recipientMessage, recipientUID);
        return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Successfully deducted ${amount}$ from your account and transferred to Recipient Account\n\n-Recipient Info-\n❏Name: ${Rname}\n❏BankID: ${recipientUID}\n\n-𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 Bank✅`);
        

      case "richest":
        const bankDataCp = JSON.parse(fs.readFileSync('scripts/cmds/assets/bank.json', 'utf8'));
        const Bal = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank : 0;
        const topUsers = Object.entries(bankDataCp)
          .sort(([, a], [, b]) => b.bank - a.bank)
          .slice(0, 25);

        const output = (await Promise.all(topUsers.map(async ([userID, userData], index) => {
          const userName = await usersData.getName(userID);
          return `[${index + 1}. ${userName}: ${Bal}]`;
        }))).join('\n');

        return message.reply("Richest people in the Bank Bot system👑🤴:\n" + output);


case "loan":
  const maxLoanAmount = 100000;
  const userLoan = bankData[user].loan || 0;
  const loanPayed = bankData[user].loanPayed !== undefined ? bankData[user].loanPayed : true;

  if (!amount) {
    return message.reply("[🏦 Bank Bot 🏦]\n\n❏Please enter a valid loan amount..❗");
  }

  if (amount > maxLoanAmount) {
    return message.reply("[🏦 Bank Bot 🏦]\n\n❏The maximum loan amount is 100000 ‼️");
  }

  if (!loanPayed && userLoan > 0) {
    return message.reply(`[🏦 Bank Bot 🏦]\n\n❏You cannot take a new loan until you pay off your current loan..😑\nYour current loan to pay: ${userLoan}$`);
  }

  bankData[user].loan = userLoan + amount;
  bankData[user].loanPayed = false;
  bankData[user].bank += amount;

  fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

  return message.reply(`[🏦 Bank Bot 🏦]\n\n❏You have successfully taken a loan of ${amount}$. Please note that loans must be repaid within a certain period.😉`);
	

case "payloan":
  const loanBalance = bankData[user].loan || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("[🏦 Bank Bot 🏦]\n\n❏Please enter a valid amount to repay your loan..❗");
  }

  if (loanBalance <= 0) {
    return message.reply("[🏦 Bank Bot 🏦]\n\n❏You don't have any pending loan payments.😄");
  }

  if (amount > loanBalance) {
    return message.reply(`[🏦 Bank Bot 🏦]\n\n❏The amount required to pay off the loan is greater than your due amount. Please pay the exact amount.😊\nYour total loan: ${loanBalance}$`);
  }

  if (amount > userMoney) {
    return message.reply(`[🏦 Bank Bot 🏦]\n\n❏You do not have ${amount}$ in your balance to repay the loan.❌\nType ${p}bal\nto view your current main balance..🫵`);
  }

  bankData[user].loan = loanBalance - amount;

  if (loanBalance - amount === 0) {
    bankData[user].loanPayed = true;
  }

  await usersData.set(event.senderID, {
    money: userMoney - amount
  });

  fs.writeFileSync("scripts/cmds/assets/bank.json", JSON.stringify(bankData));

  return message.reply(`[🏦 Bank Bot 🏦]\n\n❏Successfully repaid ${amount}$ towards your loan.✅\n\nto check type:\n${p}bankv2 balance\n\nAnd your current loan to pay: ${bankData[user].loan}$`);
			
        
default:
        return message.reply(`===[🏦 Bank Bot 🏦]===\n\n❏Please use one of the following commands:\n⭔ ${p}Bankv2 Deposit\n⭔ ${p}Bankv2 Withdraw\n⭔ ${p}Bankv2 Balance\n⭔ ${p}Bankv2 Interest\n⭔ ${p}Bankv2 Transfer\n⭔ ${p}Bankv2 Richest\n⭔ ${p}Bankv2 Loan\n⭔ ${p}Bankv2 PayLoan`);
    }
  }
};


