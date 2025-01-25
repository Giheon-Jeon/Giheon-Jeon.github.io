const quotes = [
    {
        quotes: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        quotes: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        quotes: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
    },
    {
        quotes: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
    },
    {
        quotes: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        quotes: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        quotes: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
    },
    {
        quotes: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
    },
    {
        quotes: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        quotes: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        quotes: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
    },
    {
        quotes: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quotes;
author.innerText = todaysQuote.author;