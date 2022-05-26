const stopwords = ['Z', 'whom', 'enough', 'de', 'bill', 'had', 'therefore', 'w', 'cses', 'afterwards', '3', 'anyway', 'hers', 'on', '?', 'describe', 'doing', 'but', 'sometimes', 'elsewhere', 'hereafter', 'used', 'co', 'cannot', 'mine', 'D', 'front', 'our', 'four', 'three', 'top', 'whenever', 'again', 'whither', '*', 'must', 'sincere', 'j', '\r', 'e', 'regarding', 'B', ',', 'really', 'itself', 'twenty', 'much', 'already', 'other', 'move', '%', 'otherwise', 'sixty', '4', 'R', 'above', 'me', 'or', 'eleven', 'hereupon', 'nothing', 'somewhere', 't', 'up', 'whole', 'either', 'a', 'meanwhile', 'upon', 'several', 'various', 'such', 'cant', 'submit', 'for', 'anything', 'they', 'thereby', 'L', 'Y', 'back', 'N', 'among', 'the', 'amongst', 'around', 'bottom', 'yourself', 'down', 'my', 'no', 'each', 'myself', 'everyone', 'towards', 'thereafter', '"', 'ours', 'inc', 'however', 'p', 'two', '+', 'twelve', 'more', 'something', 'anyhow', 'per', 'y', 'most', 'and', 'did', 'thereupon', 'then', '[', 'everything', 'S', 'former', 'are', 'codeforces', '$', 'if', 'sometime', 'all', 'latterly', '}', ':', 'one', 'codechef', '#', 'becomes', 'quite', 'hasnt', 'why', 'this', 'beforehand', 'o', 'of', 'O', 'n', 'almost', 'fire', '8', 'last', ']', '\n', 'what', 'V', '<', 'ourselves', 'five', 'whereby', 'etc', 'within', 'nowhere', 'neither', 'eight', 'didn', 'was', '>', 'nevertheless', 'rather', 'also', 'together', 'h', 'its', 'first', 'z', 'beside', '0', '^', 'amount', 'any', 'v', 'without', 'keep', 'at', 'wherein', 'leetcode', 'after', 'here', 'via', 'both', 'own', '6', '\t', 'same', 'behind', 'testcase', 're', '@', 'few', 'may', 'unless', 'J', 'make', 'c', 'further', 'F', 'amoungst', 'so', 'before', 'someone', 'wherever', '-', '7', 'G', '\x0c', '`', 'seems', 'ten', 'in', 'once', 'whereas', 'somehow', 'themselves', 'over', 'can', 'hence', 'computer', 'C', 'become', 'six', 'were', 'from', 'now', 'input', 'k', 'chef', 'f', 'about', 'g', 'Q', 'show', 'namely', '~', 'he', 'often', 'i', 'even', 'call', 'hundred', 'using', 'thick', 'r', 'third', 'is', 'see', 'nine', 'him', 'might', 'whether', 'perhaps', 'none', 'himself', 'empty', '\\', 'only', 'example', 'besides', 'con', 'system', 'by', 'part', 'beyond', 'them', 'ltd', 'yours', 'with', 'always', 'ever', 'l', 'U', 'least', 'km', 'you', 'x', 'whose', 'throughout', 'latter', 'should', 'thin', 'another', 'un', 'because', '.', 'cry', 'take', '=', '|', 'who', 'has', 'into', 'P', 'done', 'am', 'name', 'fifty', 'else', 'b', 'us', 'E', 'against', 'noone', 'onto', 'until', ')', 'although', 'along', 'be', '&', 'she', 'off', 'made', 'when', 'yet', 'we', ' ', 'others', 'go', 'an', 'nor', 'ie', 'q', 'not', 'mill', ';', '2', 'their', 'those', 'been', 'interest', 'how', 'his', 'toward', 'fifteen', 'anywhere', 'thru', 'during', 'eg', 'whoever', 'except', '5', 'than', 'alone', 'though', 'does', 'less', 'please', 'everywhere', 'due', 'formerly', 'to', 'do', 'many', 'whatever', 'get', 'some', '(', 'every', 'full', 'couldnt', 'under', 'could', 'that', 'seeming', 'thence', 'put', 'K', 'fill', 'never', 'would', 'will', 'which', 'nobody', 'seemed', 'moreover', 'just', 'anyone', 'her', 'below', 'became', 'well', 'between', 'find', 'don', 'whence', 'X', 'yourselves', 'd', '_', 'M', 'I', 'seem', 'while', 'say', 'very', 'whereafter', 'output', 'across', 'herein', 'serious', 'out', 'code', 'therein', 'next', 'since', 'too', '!', 'W', 'being', '\x0b', 'T', 'H', 'A', '/', 'kg', 'm', 'herself', '9', 'thus', 'through', 'found', '1', 'mostly', 'side', 'becoming', 'u', 'these', 'where', 'whereupon', "'", 'still', 'it', 'doesn', '{', 's', 'indeed', 'have', 'your', 'hereby', 'detail', 'forty', 'give', 'there', 'as']
const express = require("express");
const ejs = require("ejs");
const { json } = require("express");
const path = require("path");
fs = require('fs')
var pds = JSON.parse(fs.readFileSync('./tf-idf.json', 'utf-8'))
var uniq = JSON.parse(fs.readFileSync('./uniqueKeys.json', 'utf-8'))
var idx = JSON.parse(fs.readFileSync('./idx_vec.json', 'utf-8'))
var lin = JSON.parse(fs.readFileSync('./name_link.json', 'utf-8'))
var tfidf = Object.keys(pds)

var pd = { "": [] };
for (let i = 0; i < tfidf.length; i++) {
    var arr = []
    for (let j = 0; j < uniq.length; j++) arr.push(0);
    pd[tfidf[i]] = arr;
    pds[tfidf[i]].forEach((item) => {
        pd[tfidf[i]][item[0]] += item[1];
    })
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/search", (req, res) => {
    const query = req.query;
    const question = query.question;
    const data = generate(question);
    res.json(data);

});
app.get("/display", (req, res) => {
    const query = req.query.question;
    var g = fs.readFileSync('./Database/' + query + '.txt') + ''
    res.render("display_temp", { title: query, text: g.replace(/(?:\r\n|\r|\n)/g, '<br>'), url: lin[query] })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

function generate(qc) {
    q = remove_stopwords(qc.toLowerCase() + '')

    function remove_stopwords(str) {
        res = []
        words = str.split(' ')
        for (i = 0; i < words.length; i++) {
            word_clean = words[i].split(".").join("")
            if (!stopwords.includes(word_clean)) {
                res.push(word_clean)
            }
        }
        return res;
    }
    let q_vec = []
    let i_idx = 0,
        k = 1.25,
        b = 0.75;
    uniq.forEach((item) => {
        var x = 0;
        for (let i = 0; i < q.length; i++) {
            if (q[i] == item) x++;
        }
        q_vec.push(x * idx[i_idx++] * (k + 1));
    });
    davg = 787829 / pds.length
    q_vec.forEach((item) => {
        item = item / (q.length + k * (1 - b + b * (qc.length / davg)));
    })

    // fucntion for dot
    dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
    const sm = q_vec.reduce((acc, cur) => {
        acc += cur * cur;
        return acc;
    }, 0)
    dct = {}
    tfidf.forEach((name) => {
        var val = dot(pd[name], q_vec);
        var smsq = Math.sqrt(sm) * Math.sqrt(pd[name].reduce((ac, curr) => {
            ac += curr * curr;
            return ac;
        }, 0))
        if (smsq > 0)
            val = val / smsq;
        dct[name] = val;
    })

    // sorting by rank
    var items = Object.keys(dct).map(
        (key) => { return [key, dct[key]] });
    items.sort(
        (first, second) => { return first[1] - second[1] }
    );
    var docRank = items.map(
        (e) => { return e[0] });

    // storing most relevant
    var ans = []
    for (let i = docRank.length - 1; i >= docRank.length - 12; i--) {
        ans.push({ title: docRank[i] });
    }
    return ans;
}