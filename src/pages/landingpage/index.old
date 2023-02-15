import React from 'react'
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import BrainBoard from '../../assets/brain_board.png'
import Keyimg from '../../assets/key.png'
import Flaskimg from '../../assets/flask.png'
import Videoimg from '../../assets/video.png'
import Reasearchimg from '../../assets/research.png'
import Bookimg from '../../assets/book.png'
import Forkimg from '../../assets/fork.png'
import Community from '../../assets/community.png'
import logo from '../../assets/sqk-logo-light.svg'
import hexaDeco from '../../assets/background/hexaDecoration.svg'
import './index.css'

const LandingPage = inject('rootStore')(
  observer(() => {
    const [Scrolled, setScrolled] = React.useState(false)

    const oncheckScroll = position => {
      if (position > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.onscroll = () => {
      oncheckScroll(window.scrollY)
    }

    return (
      <div className="landing-page">
        <Container maxWidth="lg">
          <AppBar
            position="fixed"
            color="transparent"
            elevation={0}
            className={`header-bar ${Scrolled ? 'shadow' : 'non-shadow'}`}
          >
            <Grid container justifyContent="space-evenly" alignItems="center">
              <Grid item lg={4} className="link-group-feature headbar-buttons">
                <img id="logo" src={logo} alt="" />
                <Link to={''}>
                  <Button>FEATURE</Button>
                </Link>
                <Link to={''}>
                  <Button>SHOWCASE</Button>
                </Link>
                <Link to={''}>
                  <Button>TECHNOLOGY</Button>
                </Link>
                <Link to={''}>
                  <Button>CONTACT</Button>
                </Link>
              </Grid>
              <Grid item lg={4} className="button-actions">
                <div className="vertical-line" />
                <Link to={''}>
                  <Button className="register-btn">{t('Register')}</Button>
                </Link>
                <Link to={global.globals.user ? '/dashboard' : '/login'}>
                  <Button className="login-btn">{t('Sign in')}</Button>
                </Link>
              </Grid>
            </Grid>
          </AppBar>
        </Container>
        <Container maxWidth="lg" className="landing-page-container">
          <img src={hexaDeco} className="background-hexa hexa1" alt="" />
          <img src={hexaDeco} className="background-hexa hexa2" alt="" />
          <img src={hexaDeco} className="background-hexa hexa3" alt="" />
          <Box
            display={'flex'}
            justifyContent="center"
            flexDirection={'column'}
          >
            <Typography component={'div'} align="center" display="inline">
              <div className="main-content title">Quantum machine learning</div>
            </Typography>
            <Box
              style={{ marginBottom: '48px' }}
              display={'flex'}
              justifyContent="center"
              flexDirection={'column'}
              alignItems="center"
            >
              <p className="main-content text">
                We're entering an exciting time in quantum physics and quantum
                computation:
                <span className="teal-text">
                  &nbsp;near-term quantum devices&nbsp;
                </span>
                are rapidly becoming a reality, accessible to everyone over the
                internet.
              </p>
              <p className="main-content text">
                This, in turn, is driving the development of quantum machine
                learning and variational quantum circuits.
              </p>
            </Box>
            <Grid container spacing={4} style={{ zIndex: 1 }}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <a href="whatisqml.html">
                  <div>
                    <div>
                      <div className="card">
                        <h3 className="card-title">
                          <img className="grid-img" src={BrainBoard} />
                          <br />
                          <strong>What is QML?</strong>
                        </h3>
                        <p className="card-grid-content">
                          Find out how the principles of quantum computing and
                          machine learning can be united to create something
                          new.
                        </p>
                        <div className="readmore-btn">
                          <h5>
                            Read more
                            <DoubleArrowIcon />
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <a href="whatisqml.html">
                  <div>
                    <div>
                      <div className="card">
                        <h3 className="card-title">
                          <img className="grid-img key" src={Keyimg} />
                          <br />
                          <strong>Key Concepts</strong>
                        </h3>
                        <p className="card-grid-content">
                          Explore different concepts underpinning variational
                          quantum circuits and quantum machine learning.
                        </p>
                        <div className="readmore-btn">
                          <h5>
                            Read more
                            <DoubleArrowIcon />
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <a href="whatisqml.html">
                  <div>
                    <div>
                      <div className="card">
                        <h3 className="card-title">
                          <img className="grid-img flask" src={Flaskimg} />
                          <br />
                          <strong>Demos</strong>
                        </h3>
                        <p className="card-grid-content">
                          Take a dive into quantum machine learning by exploring
                          cutting-edge algorithms on near-term quantum hardware.
                        </p>
                        <div className="readmore-btn">
                          <h5>
                            Read more
                            <DoubleArrowIcon />
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <a href="whatisqml.html">
                  <div>
                    <div>
                      <div className="card">
                        <h3 className="card-title">
                          <img className="grid-img video" src={Videoimg} />
                          <br />
                          <strong>Videos</strong>
                        </h3>
                        <p className="card-grid-content">
                          Sit back and explore quantum machine learning and
                          quantum programming with our curated selection of
                          expert videos.
                        </p>
                        <div className="readmore-btn">
                          <h5>
                            Read more
                            <DoubleArrowIcon />
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Grid>
            </Grid>
          </Box>
          <Box
            display={'flex'}
            justifyContent="center"
            style={{ marginTop: '3rem', marginBottom: '4rem' }}
          >
            <img style={{ width: '32px' }} src={'../../assets/datasets.png'} />
            <Typography>
              &nbsp;Explore our new
              <a> quantum datasets</a>
            </Typography>
          </Box>
          <hr className="custom-hr-tag" />
          <Box
            display={'flex'}
            justifyContent="center"
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Typography
              component={'div'}
              align="center"
              style={{ marginBottom: 48 }}
            >
              <p className="main-content text">
                Our aim is to bring together a community focused on quantum
                machine learning, and provide a leading resource hub for quantum
                computing education and research.
              </p>
            </Typography>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Reasearchimg} alt="" />
                  <h5>Research focused</h5>
                  <br />
                  <span>
                    Xanadu is not just a software company; we also perform
                    high-impact research and build quantum hardware. Our
                    software gets used internally across the company — check out
                    some of
                    <a> the papers released</a> using our open-source software
                    tools.
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Bookimg} alt="" />
                  <h5>Documented</h5>
                  <br />
                  <span>
                    Code documentation is important; it encourages everyone to
                    dive straight in and begin tinkering with the code. We have
                    the highest standard for documentation — our aim is to make
                    everything accessible, from code to theory.
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Forkimg} alt="" />
                  <h5>Open source</h5>
                  <br />
                  <span>
                    The physics community is embracing open-source software,
                    bringing transparency and reproducibility to physics
                    research. All of our software is open-source, and we are
                    excited to be along for the ride.
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Community} alt="" />
                  <h5>Community driven</h5>
                  <br />
                  <span>
                    When we release software, we have the community in mind.
                    Development takes place publicly on GitHub, and members of
                    our team are available to chat on our{' '}
                    <a> Strawberry Fields Slack</a> and{' '}
                    <a>&nbsp; PennyLane forum</a>.
                  </span>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <hr className="custom-hr-tag full" />
        <Container maxWidth="lg">
          <Grid spacing={4} container justifyContent="center">
            <Grid item lg={6} md={6} xs={12}>
              <div className="introducing-content">
                <h4>PennyLane</h4>
                <hr className="custom-hr-tag underlabel" />
                <span>
                  PennyLane is an open-source software framework for quantum
                  machine learning, quantum chemistry, and quantum computing,
                  with the ability to run on all hardware. Maintained with ❤️ by
                  Xanadu.
                </span>
              </div>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <div className="introducing-content">
                <h4>PennyLane</h4>
                <hr className="custom-hr-tag underlabel" />
                <div className="link-group">
                  <a>Home</a>
                  <a>Learn</a>
                  <a>Demonstrations</a>
                  <a>Documentation</a>
                  <a>GitHub</a>
                  <a>Twitter</a>
                  <a>Blog</a>
                </div>
              </div>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <div className="introducing-content">
                <h4>Xanadu</h4>
                <hr className="custom-hr-tag underlabel" />
                <div className="link-group">
                  <a>Home</a>
                  <a>About</a>
                  <a>Hardwear</a>
                  <a>Careers</a>
                  <a>Cloud</a>
                  <a>Forum</a>
                  <a>Blog</a>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <hr className="custom-hr-tag full hr-footer" />
        <Container maxWidth="lg">
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <div className="social-link-group">
              <a>
                <TwitterIcon />
              </a>
              <a>
                <GitHubIcon />
              </a>
              <a>
                <LinkedInIcon />
              </a>
              <a>
                <WhatsAppIcon />
              </a>
              <a>
                <DashboardIcon />
              </a>
              <a>
                <RssFeedIcon />
              </a>
            </div>
            <a className="footer-notice link">
              Stay updated with our newsletter
            </a>
            <Typography align="center" className="footer-notice content">
              Copyright © 2022, SQK Cloud, Inc.
              <br />
              TensorFlow, the TensorFlow logo, and any related marks are
              trademarks of Google Inc.
            </Typography>
          </Box>
        </Container>
      </div>
    )
  })
)
export default LandingPage
