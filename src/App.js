import {useEffect, useState} from "react";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";
import alanLogo from './assets/alan-logo-horizontal-color-white.png'

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles'

const alanKey = 'b4eaf62c20b92dac9c3c410290a1dc7c2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)
    const classes = useStyles()

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), {fuzzy: true}) : number
                    const article = articles[parsedNumber - 1]

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again !')
                    } else if (article) {
                        window.open(article.url, '_blank')
                        alanBtn().playText('opening...')
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            }
        })
    }, [])

    return <div>
        <div className={classes.logoContainer}>
            <img src={alanLogo} alt="alan-logo" className={classes.alanLogo} style={{backgroundColor: 'indigo'}}/>
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
}

export default App