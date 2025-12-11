const TAX_CATEGORIES = {
    withholding: {
        title: "WITHHOLDING TAX CALCULATOR",
        rates: {
            "Rent Tax": 0.10,
            "Bank Interest": 0.05,
            "Dividend Tax": 0.14
        }
    },

    payable: {
        title: "PAYABLE TAX CALCULATOR",
        rates: {
            "Service Fee Tax": 0.08,
            "Contract Payment Tax": 0.10,
            "Commission Tax": 0.05
        }
    },

    income: {
        title: "INCOME TAX CALCULATOR",
        rates: {
            "Employment Income": 0.06,
            "Business Income": 0.12,
            "Investment Income": 0.15
        }
    },

    sscl: {
        title: "SSCL TAX CALCULATOR",
        rates: {
            "Salary SSCL": 0.025,
            "Business SSCL": 0.03
        }
    },

    leasing: {
        title: "LEASING PAYMENT CALCULATOR",
        rates: {
            "Vehicle Leasing Tax": 0.05,
            "Equipment Leasing Tax": 0.04
        }
    }
};


function loadPage(pageKey) {
    const pageData = TAX_CATEGORIES[pageKey];
    const optionsDiv = document.querySelector(".options");
    const pageTitle = document.getElementById("pageTitle");

    pageTitle.textContent = pageData.title;

    optionsDiv.innerHTML = "";

    Object.keys(pageData.rates).forEach(type => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="taxType" value="${type}">
            ${type}
        `;
        optionsDiv.appendChild(label);
    });
}

document.querySelectorAll(".navbar button").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-page");
        loadPage(key);

        document.querySelectorAll(".navbar button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.getElementById("resultBox").style.display = "none";
    });
});

document.getElementById("calculateTax").addEventListener("click", () => {
    const resultBox = document.getElementById("resultBox");
    const amountInput = document.getElementById("amountInput");
    const taxType = document.querySelector("input[name='taxType']:checked");
    const activePage = document.querySelector(".navbar .active").getAttribute("data-page");

    if (!amountInput.value || isNaN(amountInput.value)) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `<span style="color:#ff8080;">⚠ Please enter a valid amount.</span>`;
        return;
    }

    if (!taxType) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `<span style="color:#ff8080;">⚠ Please select a tax type.</span>`;
        return;
    }

    const amount = parseFloat(amountInput.value);
    const selected = taxType.value;
    const rate = TAX_CATEGORIES[activePage].rates[selected];

    const tax = amount * rate;
    const net = amount - tax;

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <strong>Category:</strong> ${selected}<br>
        <strong>Amount:</strong> LKR ${amount.toLocaleString()}<br>
        <strong>Rate:</strong> ${(rate * 100).toFixed(2)}%<br>
        <strong>Tax:</strong> LKR ${tax.toLocaleString()}<br>
        <strong>After Tax:</strong> LKR ${net.toLocaleString()}
    `;
});


loadPage("withholding");
document.querySelector(".navbar button").classList.add("active");
