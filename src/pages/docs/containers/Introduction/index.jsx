import React from 'react'
import cookies from 'react-cookies'
import { unified } from 'unified'
import parse from 'remark-parse'
import Markdown from 'markdown-to-jsx'
import TreeMenu from 'docs/components/TreeMenu'
import { getScrollTop } from 'utils/dom'
import { Link } from 'react-router-dom'
import styles from './index.scss'

export default class Introduction extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseHover = this.handleMouseHover.bind(this)
    this.leftMenuRef = React.createRef()
    this.mdRef = React.createRef()
    this.asideRef = React.createRef()
    this.state = {
      md: '',
      mdHeader: {},
      asideList: [],
      topList: [],
      footerList: [],
      isHovering: false,
    }
  }

  async getMdFile() {
    const lang = cookies.load('lang')
    const folder = this.props.match.params.folder
    const upperfolder = this.props.match.params.upperfolder
    const lowerfolder = this.props.match.params.lowerfolder
    const filename = this.props.match.params.filename
    const topArr = []

    try {
      let file
      if (
        typeof upperfolder !== 'undefined' &&
        typeof lowerfolder === 'undefined'
      ) {
        topArr.push(<li>Docs&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(folder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(upperfolder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li className={styles['active']}>{t(filename)}</li>)
        file = await import(
          `@/${lang}/docs-test/v3.3/${folder}/${upperfolder}/${filename}.md`
        )
      } else if (typeof lowerfolder !== 'undefined') {
        topArr.push(<li>Docs&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(folder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(upperfolder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(lowerfolder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li className={styles['active']}>{t(filename)}</li>)
        file = await import(
          `@/${lang}/docs-test/v3.3/${folder}/${upperfolder}/${lowerfolder}/${filename}.md`
        )
      } else {
        topArr.push(<li>Docs&nbsp;/&nbsp;</li>)
        topArr.push(<li>{t(folder)}&nbsp;/&nbsp;</li>)
        topArr.push(<li className={styles['active']}>{t(filename)}</li>)
        file = await import(`@/${lang}/docs-test/v3.3/${folder}/${filename}.md`)
      }
      let content = await file.default

      const tree = unified()
        .use(parse)
        .data('settings', { position: true })
        .parse(content)

      const header = tree.children[1].children[0].value
      const mdHeader = tree.children[1].children[0].value.split(/\r?\n/)
      const mdHeaderJson = {}

      for (let i = 0; i < mdHeader.length; i++) {
        const arr = mdHeader[i].split(':')
        if (arr.length > 1) {
          mdHeaderJson[arr[0]] = arr[1].replace(/"/g, '')
        }
      }

      this.state.mdHeader = mdHeaderJson
      content = content.replace(header, '').replace(/---/g, '')
      content = `# ${this.state.mdHeader.title}${content}`

      this.setState({
        md: content,
        mdHeader: mdHeaderJson,
        topList: topArr,
      })

      const asideTitle = document.getElementsByTagName('h2')
      const asideSubTitle = document.getElementsByTagName('h3')

      let curOffset = 0
      let afterOffset = 0

      const arrTitle = []

      for (let i = 0; i < asideTitle.length; i++) {
        const afterIndex = i + 1
        curOffset = asideTitle[i].offsetTop

        if (afterIndex !== asideTitle.length)
          afterOffset = asideTitle[afterIndex].offsetTop

        const groupList = []

        for (let j = 0; j < asideSubTitle.length; j++) {
          if (
            asideSubTitle[j].offsetTop > curOffset &&
            asideSubTitle[j].offsetTop < afterOffset
          )
            groupList.push(j)
          if (afterIndex === asideTitle.length)
            if (asideSubTitle[j].offsetTop > afterOffset) groupList.push(j)
        }
        const subTitle = []
        if (groupList.length > 0) {
          groupList.forEach(function(item) {
            subTitle.push(
              <li>
                <a href={`#${asideSubTitle[item].id}`}>
                  {asideSubTitle[item].innerText}
                </a>
              </li>
            )
          })
          arrTitle.push(
            <li>
              <a href={`#${asideTitle[i].id}`}>{asideTitle[i].innerText}</a>
              <ul>{subTitle}</ul>
            </li>
          )
        } else {
          arrTitle.push(
            <li>
              <a href={`#${asideTitle[i].id}`}>{asideTitle[i].innerText}</a>
            </li>
          )
        }
      }
      this.setState({
        asideList: arrTitle,
      })
      window.addEventListener('scroll', this.handleScroll)
    } catch (error) {}
  }

  async componentDidMount() {
    await this.getMdFile()
    this.mdCssUpdate()
    this.mdFooter()
    const activeLink = this.leftMenuRef.current.getElementsByClassName(
      'active'
    )[0]
    if (this.state.topList.length === 4) {
      activeLink.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.parentNode.parentNode.classList.toggle(
        styles['ul-active']
      )
      activeLink.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.classList.toggle(styles['ul-active'])
    } else if (this.state.topList.length === 5) {
      activeLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.toggle(
        styles['ul-active']
      )
      activeLink.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.parentNode.parentNode.classList.toggle(
        styles['ul-active']
      )
      activeLink.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.classList.toggle(styles['ul-active'])
    } else {
      activeLink.parentNode.parentNode.parentNode.children[0].childNodes[0].classList.toggle(
        styles['arrow-open']
      )
      activeLink.parentNode.parentNode.parentNode.children[1].classList.toggle(
        styles['ul-active']
      )
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      await this.getMdFile()
      this.mdCssUpdate()
      this.mdFooter()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  mdFooter() {
    const leftMenu = this.leftMenuRef.current.getElementsByTagName('li')
    const liArr = []
    let prev = 0
    let next = 0
    const footer = []
    for (let i = 0; i < leftMenu.length; i++) {
      if (leftMenu[i].children.length === 1) {
        liArr.push(leftMenu[i])
      }
    }
    for (let i = 0; i < liArr.length; i++) {
      if (liArr[i].firstChild.classList.value === 'active') {
        prev = i - 1
        next = i + 1
        break
      }
    }
    if (prev === -1) {
      const nextUrl = new URL(liArr[next].children[0].href)
      footer.push(
        <Link className={styles['next']} to={nextUrl.pathname}>
          <span>
            {t('NEXT')}: {liArr[next].innerText}{' '}
          </span>
          <img src="/dist/assets/docs/v3.3/next.svg" alt="Next" />
        </Link>
      )
    } else {
      const prevUrl = new URL(liArr[prev].children[0].href)
      footer.push(
        <Link className={styles['last']} to={prevUrl.pathname}>
          <img src="/dist/assets/docs/v3.3/last.svg" alt="Previous" />
          <span>
            {' '}
            {t('PREVIOUS')}: {liArr[prev].innerText}
          </span>
        </Link>
      )
      const nextUrl = new URL(liArr[next].children[0].href)
      footer.push(
        <Link className={styles['next']} to={nextUrl.pathname}>
          <span>
            {t('NEXT')}: {liArr[next].innerText}{' '}
          </span>
          <img src="/dist/assets/docs/v3.3/next.svg" alt="Next" />
        </Link>
      )
    }

    this.setState({
      footerList: footer,
    })
  }

  mdCssUpdate() {
    const h6Arr = this.mdRef.current.getElementsByTagName('h6')
    while (h6Arr.length) {
      const parent = h6Arr[0].parentNode
      while (h6Arr[0].firstChild) {
        parent.insertBefore(h6Arr[0].firstChild, h6Arr[0])
      }
      parent.removeChild(h6Arr[0])
    }
    const noticesArr = this.mdRef.current.getElementsByClassName('notices')
    for (let i = 0; i < noticesArr.length; i++) {
      if (noticesArr[i].classList[1] === 'note') {
        noticesArr[i].classList.add(styles['notices'], styles['note'])
        noticesArr[i].classList.remove('note')
      } else if (noticesArr[i].classList[1] === 'info') {
        noticesArr[i].classList.add(styles['notices'], styles['info'])
        noticesArr[i].classList.remove('info')
      } else if (noticesArr[i].classList[1] === 'tip') {
        noticesArr[i].classList.add(styles['notices'], styles['tip'])
        noticesArr[i].classList.remove('tip')
      } else if (noticesArr[i].classList[1] === 'warning') {
        noticesArr[i].classList.add(styles['notices'], styles['warning'])
        noticesArr[i].classList.remove('twarningip')
      }
    }

    const codeTabsArr = this.mdRef.current.getElementsByClassName('code-tabs')
    const navArr = this.mdRef.current.getElementsByClassName('nav')
    const navItemArr = this.mdRef.current.getElementsByClassName('nav-item')
    const navLinkArr = this.mdRef.current.getElementsByClassName('nav-link')
    const tabContentArr = this.mdRef.current.getElementsByClassName(
      'tab-content'
    )
    const tabPaneArr = this.mdRef.current.getElementsByClassName('tab-pane')
    const highlightArr = this.mdRef.current.getElementsByClassName('highlight')
    const copyCodeButtonArr = this.mdRef.current.getElementsByClassName(
      'copy-code-button'
    )
    const codeOverDivArr = this.mdRef.current.getElementsByClassName(
      'code-over-div'
    )

    if (codeTabsArr.length > 0) {
      for (let i = 0; i < codeTabsArr.length; i++) {
        codeTabsArr[i].classList.add(styles['code-tabs'])
      }
      for (let i = 0; i < navArr.length; i++) {
        navArr[i].classList.add(styles['nav'], styles['nav-tabs'])
      }
      for (let i = 0; i < navItemArr.length; i++) {
        navItemArr[i].classList.remove(styles['active'])
      }
      for (let i = 0; i < navItemArr.length; i++) {
        navItemArr[i].classList.add(styles['nav-item'])
      }
      for (let i = 0; i < navLinkArr.length; i++) {
        navLinkArr[i].classList.add(styles['nav-link'])
      }
      for (let i = 0; i < tabContentArr.length; i++) {
        tabContentArr[i].classList.add(styles['tab-content'])
      }
      for (let i = 0; i < tabPaneArr.length; i++) {
        tabPaneArr[i].classList.add(styles['tab-pane'])
      }
      for (let i = 0; i < codeTabsArr.length; i++) {
        codeTabsArr[i].children[0].children[0].classList.add(styles['active'])
        codeTabsArr[i].children[1].children[0].classList.add(styles['active'])
      }
    }
    for (let i = 0; i < highlightArr.length; i++) {
      highlightArr[i].classList.add(styles['highlight'])
    }
    for (let i = 0; i < copyCodeButtonArr.length; i++) {
      copyCodeButtonArr[i].classList.add(styles['copy-code-button'])
    }
    for (let i = 0; i < codeOverDivArr.length; i++) {
      codeOverDivArr[i].classList.add(styles['code-over-div'])
    }
    const copyCodeSelection = this.mdRef.current.getElementsByClassName(
      styles['copy-code-button']
    )
    for (let i = 0; i < copyCodeSelection.length; i++) {
      copyCodeSelection[i].addEventListener('click', function(e) {
        e.preventDefault(e)
        navigator.clipboard
          .writeText(e.currentTarget.nextElementSibling.children[0].innerText)
          .then(
            function() {
              e.target.classList.add(styles['is-active'])
              e.target.blur()
              setTimeout(function() {
                e.target.classList.remove(styles['is-active'])
              }, 2000)
            },
            function() {}
          )
      })
    }

    const userSelection = this.mdRef.current.getElementsByClassName(
      styles['nav-item']
    )
    for (let i = 0; i < userSelection.length; i++) {
      userSelection[i].addEventListener('click', function(e) {
        e.preventDefault()
        const removeTargetArr = []
        e.currentTarget.classList.add(styles['active'])
        for (let j = 0; j < e.currentTarget.parentNode.children.length; j++) {
          if (
            e.currentTarget.innerText !==
            e.currentTarget.parentNode.children[j].innerText
          ) {
            removeTargetArr.push(j)
          } else {
            e.currentTarget.parentNode.parentNode.children[1].children[
              j
            ].classList.add(styles['active'])
          }
        }
        removeTargetArr.forEach(function(index) {
          e.currentTarget.parentNode.children[index].classList.remove(
            styles['active']
          )
          e.currentTarget.parentNode.parentNode.children[1].children[
            index
          ].classList.remove(styles['active'])
        })
      })
    }
  }

  handleScroll = () => {
    const scrollTop = getScrollTop()
    const asideArr = this.asideRef.current.getElementsByTagName('a')
    const mdH2Arr = this.mdRef.current.getElementsByTagName('h2')
    const mdH3Arr = this.mdRef.current.getElementsByTagName('h3')

    const mdTitleArr = []
    let curOffset = 0
    let afterOffset = 0

    for (let i = 0; i < mdH2Arr.length; i++) {
      mdTitleArr.push(mdH2Arr[i])
      const afterIndex = i + 1
      curOffset = mdH2Arr[i].offsetTop

      if (afterIndex !== mdH2Arr.length)
        afterOffset = mdH2Arr[afterIndex].offsetTop

      for (let j = 0; j < mdH3Arr.length; j++) {
        if (
          mdH3Arr[j].offsetTop > curOffset &&
          mdH3Arr[j].offsetTop < afterOffset
        )
          mdTitleArr.push(mdH3Arr[j])
        if (afterIndex === mdH2Arr.length)
          if (mdH3Arr[j].offsetTop > afterOffset) mdTitleArr.push(mdH3Arr[j])
      }
    }

    if (scrollTop === 0) {
      for (let i = 0; i < asideArr.length; i++) {
        asideArr[i].classList.remove(styles['active'])
      }
    }
    mdTitleArr.forEach(function(item) {
      if (scrollTop > item.offsetTop + 70) {
        for (let i = 0; i < asideArr.length; i++) {
          if (item.innerText === asideArr[i].innerText) {
            for (let j = 0; j < asideArr.length; j++) {
              asideArr[j].classList.remove(styles['active'])
            }
            asideArr[i].classList.add(styles['active'])
          }
        }
      }
    })

    if (scrollTop >= 100 && scrollTop <= 150) {
      this.leftMenuRef.current.style.top = '120px'
      this.asideRef.current.style.top = '120px'
    } else if (scrollTop <= 100) {
      this.leftMenuRef.current.style.top = '220px'
      this.asideRef.current.style.top = '220px'
    } else if (scrollTop >= 150) {
      this.leftMenuRef.current.style.top = '70px'
      this.asideRef.current.style.top = '70px'
    }
  }

  renderAside() {
    return (
      <div className={styles['aside']} ref={this.asideRef}>
        <div className={styles['inner-div']}>
          <div className={styles['title']}>{t('What’s on this Page')}</div>
          <div className={styles['tabs']}>
            <nav id="TableOfContents">
              <ul>{this.state.asideList}</ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  renderTop() {
    return (
      <section className={styles['section-1']}>
        <div className={styles['common-layout']}>
          <ol className={styles['breadcrumbnav']}>{this.state.topList}</ol>
          <div
            className={styles['title-div']}
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
          >
            <p>
              <a href="/docs">{t('Documentation')}</a>
            </p>
            <div className={`${styles['menu']} ${styles['section-control']}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className={styles['search-div']}>
            <div className={styles['search-input-div']}>
              <input id="search" type="text" placeholder="Documentation" />
              <svg width="1em" height="1em" viewBox="0 0 18 18">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M12.606 11.192l5.24 5.24-1.415 1.414-5.239-5.24a7.041 7.041 0 0 0 1.414-1.414z"
                    fill="#324558"
                  ></path>
                  <path
                    d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm0-2A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
                    fill="#B6C2CD"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
    )
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState)
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    }
  }

  render() {
    return (
      <main className={`${styles['main-section']} ${styles['padding']}`}>
        {this.renderTop()}
        <section
          className={styles['section-menu']}
          onMouseLeave={this.handleMouseHover}
          style={{
            display: this.state.isHovering === false ? 'none' : 'block',
          }}
        >
          <div className={styles['common-layout']}>
            <ul className={styles['common-flex-layout']}>
              <li>
                <p>
                  <a href="/docs">{t('Documentation')}</a>
                </p>
                <ul>
                  <li>
                    <a href="/docs/introduction/what-is-/">
                      {t('Introduction')}
                    </a>
                  </li>
                  <li>
                    <a href="/docs/quick-start/create-workspace-and-project/">
                      {t('Quickstarts')}
                    </a>
                  </li>
                  <li>
                    <a href="/docs/installing-on-linux/introduction/intro/">
                      {t('Installing on Linux')}
                    </a>
                  </li>
                  <li>
                    <a href="/docs/installing-on-kubernetes/introduction/overview/">
                      {t('installing-on-kubernetes')}
                    </a>
                  </li>
                  <li>
                    <a href="/docs/multicluster-management/introduction/overview/">
                      {t('multicluster-management')}
                    </a>
                  </li>
                  <li>
                    <a href="/docs/">{t('Learn More')}</a>
                  </li>
                  <li style={{ height: 0, margin: 0, padding: 0 }}></li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles['section-2']}>
          <div className={styles['common-layout']}>
            <div
              className={`${styles['left-div']} left-tree`}
              style={{ bottom: '10px' }}
              ref={this.leftMenuRef}
            >
              <div className={styles['inner-tree']}>
                <div>
                  <TreeMenu />
                </div>
              </div>
            </div>
            <div className={styles['middle-div']}>
              <div className={`${styles['content-div']} ${styles['main-div']}`}>
                <div ref={this.mdRef} className={styles['md-body']}>
                  <Markdown children={`${this.state.md}`} />
                </div>
              </div>
              <div
                className={`${styles['page-div']} ${styles['common-flex-layout']}`}
              >
                {this.state.footerList}
              </div>
            </div>
            {this.renderAside()}
          </div>
        </section>
      </main>
    )
  }
}
