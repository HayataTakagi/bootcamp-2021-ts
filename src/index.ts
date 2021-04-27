type TextType = {
    name: string;
    tagName: "input";
    type: "text" | "tel" | "email";
    label: string;
    placeholder: string;
};
type CheckAndRadioType = {
    name: string;
    tagName: "input";
    type: "radio" | "checkbox";
    label: string;
    values: { label: string; value: number }[];
};
type SelectType = {
    name: string;
    tagName: "select";
    label: string;
    options: { text: string; value: number }[];
};
type TextAreaType = {
    name: string;
    tagName: "textarea";
    label: string;
    placeholder: string;
};

type Item = TextType | CheckAndRadioType | SelectType | TextAreaType;

const items: Item[] = [
    {
        name: "name",
        label: "お名前",
        tagName: "input",
        type: "text",
        placeholder: "例）山田　太郎",
    },
    {
        name: "email",
        label: "メールアドレス",
        tagName: "input",
        type: "email",
        placeholder: `例）example@gmail.com`,
    },
    {
        name: "tel",
        label: "電話番号",
        tagName: "input",
        type: "tel",
        placeholder: "例）080-1234-5678",
    },
    {
        name: "address",
        label: "ご住所",
        tagName: "input",
        type: "text",
        placeholder: "例）東京都千代田区丸の内1丁目9-2",
    },
    {
        name: "contact",
        label: "ご希望の返信方法",
        tagName: "input",
        type: "radio",
        values: [
            {label: "メール", value: 0},
            {label: "電話", value: 1},
            {label: "どちらでも可", value: 2},
        ],
    },
    {
        name: "time",
        label: "連絡可能な時間帯（電話）",
        tagName: "input",
        type: "checkbox",
        values: [
            {label: "09:00〜12:00", value: 0},
            {label: "13:00〜16:00", value: 1},
            {label: "16:00〜19:00", value: 2},
        ],
    },
    {
        name: "inquiry_kind",
        label: "お問い合せの種類",
        tagName: "select",
        options: [
            {text: "返品について", value: 0},
            {text: "発送について", value: 1},
            {text: "その他", value: 2},
        ],
    },
    {
        name: "inquiry_detail",
        label: "お問い合せ内容",
        tagName: "textarea",
        placeholder: "例）お問い合わせ内容詳細をご記入ください",
    },
];

// _____________________________________________________________________________
//

function createInputRow(item: TextType) {
    return `
    <tr>
      <th>${item.label}
      </th>
      <td>
        <input placeholder="${item.placeholder}" />
      </td>
    </tr>
  `;
}

function createRadioRow(item: CheckAndRadioType) {
    if (item.values == null) return
    const options = item.values?.map(v => {
        return `
<input type="${item.type}" id="${item.name}-${v.value}" name="${item.name}" value="${v.value}">
<label for="${item.name}-${v.value}">${v.label}</label>`;
    })
    return `
    <tr>
      <th>${item.label}</th>
      <td>
      ${options.join("")}
      </td>
    </tr>
  `;
}

function createSelectRow(item: SelectType) {
    if (item.options == null) return
    const options = item.options.map(v => {
        return `
        <option value="${v.value}">${v.text}</option>
        `;
    });
    return `
    <tr>
      <th>${item.label}
      </th>
      <td>
        <select name="${item.name}">${options.join("")}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextAreaType) {
    return `
    <tr>
      <th>${item.label}
      </th>
      <td>
        <textarea placeholder="${item.placeholder}"></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
    const list = items
        .map((item) => {
            switch (item.tagName) {
                case "input":
                    if (item.type === "text" || item.type === "tel" || item.type === "email") return createInputRow(item);
                    else if (item.type === "radio" || item.type === "checkbox") return createRadioRow(item);
                    else return
                case "select":
                    return createSelectRow(item);
                case "textarea":
                    return createTextAreaRow(item);
            }
        })
        .join("");
    return `<table>${list}</table>`;
}

function createFormDom() {
    const form = document.getElementById("form");
    if (!form) return
    form.innerHTML = createTable();
}

createFormDom();
