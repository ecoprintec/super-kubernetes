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
              <div className="main-content title">Science Cloud suite</div>
            </Typography>
            <Box
              style={{ marginBottom: '48px' }}
              display={'flex'}
              justifyContent="center"
              flexDirection={'column'}
              alignItems="center"
            >
              <p className="main-content text">
                Exascale을 향한 HPC, 빅 데이터, AI 융합은 HPC, 클라우드, 빅
                데이터 및 인공 지능(AI) 도메인 간의 융합을 기반으로 하는 가장
                진보된 컴퓨팅, 스토리지 및 상호 연결 기술에 대한 업데이트된
                비전을 제공합니다:
                <span className="teal-text">
                  &nbsp;Cloud&nbsp;-&nbsp;HPC&nbsp;-&nbsp;Big
                  Data&nbsp;-&nbsp;AI&nbsp;
                </span>
                통합 응용 개념에 맞는 현재 사용 가능한 기술에 대한 개요를
                제공하고 과학 및 산업 응용 분야에서 실제로 사용되는 예를
                제시합니다.
              </p>
              <p className="main-content text">
                AI, 빅데이터 및 클라우드 기술을 통합하고 엑사스케일 수준의 성능
                및 에너지 효율성 목표를 달성하는 데 직면한 문제에 대한 통찰력을
                제공합니다. 리소스를 프로비저닝 및 관리하고 사용을 모니터링하는
                혁신적인 방법을 제시합니다.
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
                          <strong>
                            대규모 워크플로 실행을 지원하기 위한 분산 HPC 리소스
                            오케스트레이션
                          </strong>
                        </h3>
                        <p className="card-grid-content">
                          고성능 컴퓨팅(HPC) 및 클라우드 리소스 공급자는 기존
                          HPC 시뮬레이션, 머신 러닝 및 딥 러닝 처리와 빅 데이터
                          분석의 조합하며 애플리케이션 워크플로 관리 시스템에 더
                          많은 기능을 통합하고 실행의 역동성을 지원해야 합니다.
                          인프라 자원의 (에너지) 효율성을 보존하면서 성능 향상을
                          활용하려면 GPU 및 FPGA에서 신경망 프로세서(NNP),
                          뉴로모픽 프로세서에 이르는 이기종의 하드웨어 가속기를
                          컴퓨팅 자산에 통합해야 합니다.
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
                          <strong>
                            분산 워크플로 실행 및 데이터 관리를 위한 과학
                            클라우드 서비스
                          </strong>
                        </h3>
                        <p className="card-grid-content">
                          과학자들은 SWMS(Scientific Workflow Management
                          System)를 사용하여 하이브리드 클라우드환경에서
                          워크플로 실행을 관리할 수 있습니다.
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
                          <strong>
                            DeepHealth HPC 인프라: IA 기반 의료 솔루션을 위한
                            이기종 HPC 및 클라우드 컴퓨팅 인프라 활용
                          </strong>
                        </h3>
                        <p className="card-grid-content">
                          HPC 및 클라우드 인프라에서 딥러닝 학습 작업의 효율적인
                          병렬화를 위해 HPC 워크로드를 오케스트레이션하는 데
                          사용되는 워크플로우 관리자를 구현하고, 많은 코어, GPU
                          및 FPGA 가속 장치에서 효율적인 실행 딥러닝 추론 및
                          훈련 작업을 위한 병렬 프로그래밍 모델을 포함합니다.
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
                          <strong>
                            엑사스케일 수준에서 HPC 및 인공 지능 클라우드 기술
                            융합{' '}
                          </strong>
                        </h3>
                        <p className="card-grid-content">
                          빅데이터, 고성능 컴퓨팅, 클라우드의 융합은 미래
                          지속가능한 경제 성장의 핵심 동력입니다. 많은 분야의
                          기술 발전은 수집된 대량의 데이터에서 정확한 정보를
                          얻을 수 있는 능력에 의해 결정되며, 이를 위해서는
                          강력한 컴퓨팅 리소스가 필요합니다.
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
                과학 실험과 대규모 시뮬레이션에 의해 데이터가 생성되는 속도는
                대규모 데이터 세트를 효율적이고 효과적으로 분석하는 능력
                측면에서 새로운 과제를 제시합니다. 인공 지능, 특히 기계 학습 및
                딥 러닝은 최근 시뮬레이션 속도를 높이는 추진력을 얻었습니다.
                SQK는 복잡한 워크플로를 쉽게 설명하고 관리하는 효과적인
                메커니즘을 활용할 것입니다. 에너지 효율성은 특수 하드웨어
                가속기의 대규모 사용, 실행 중인 시스템 모니터링 및 작업 예약의
                스마트 메커니즘 적용을 통해 달성됩니다.
              </p>
            </Typography>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Reasearchimg} alt="" />
                  <h5>우리의 이야기</h5>
                  <br />
                  <span>
                    고성능, 저전력 및 확장 가능한 클라우드 아키텍처를 결합한
                    SuperKubernetes, SuperCloud 및 Sciaas 와 같은 HPC 프로젝트를
                    진행하고 있습니다 .
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Bookimg} alt="" />
                  <h5>우리의 비젼</h5>
                  <br />
                  <span>
                    과학 실험과 대규모 시뮬레이션에 의해 데이터가 생성되는
                    속도는 대규모 데이터 세트를 효율적이고 효과적으로 분석하는
                    능력 측면에서 새로운 과제를 제시합니다. 에너지 효율성은 특수
                    하드웨어 가속기의 대규모 사용, 실행 중인 시스템 모니터링 및
                    작업 예약의 스마트 메커니즘을 제시합니다.
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Forkimg} alt="" />
                  <h5>우리의 기술</h5>
                  <br />
                  <span>
                    기존의 HPC 기술을 머신 러닝 및 딥 러닝과 같은 인공 지능과 빅
                    데이터 분석 기술과 결합하여 애플리케이션 테스트 사례 결과를
                    향상시킵니다. 머신 러닝과 딥 러닝의 성능은 전용 하드웨어
                    장치를 사용하여 가속화됩니다. 엑사스케일 수준 클라우드
                    컴퓨팅 응용영역 확장해 나갈 계획입니다.
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <div className="text-center second-main-content">
                  <img src={Community} alt="" />
                  <h5>플랫폼 개발</h5>
                  <br />
                  <span>
                    대규모 수치 시뮬레이션, 머신 러닝(딥 러닝 포함) 교육/추론
                    작업, 빅 데이터 분석을 혼합하여 HPC 리소스에서 효율적으로
                    실행할 수 있는 애플리케이션 워크플로를 가능하게 하는
                    소프트웨어 스택에 대한 액세스를 제공
                  </span>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <hr className="custom-hr-tag full" />
        <Container maxWidth="lg">
          <Box>
            <a className="footer-notice link">문의하기</a>
            <Typography align="center" className="footer-notice content">
              Copyright © 2022, SQK Cloud, Inc.
              <br />
              사용자가 애플리케이션 워크플로를 쉽게 정의하고 가장 적합한 실행
              환경과 일치시킬 수 있는 소프트웨어 구성 요소를 통합합니다. SQK
              소프트웨어 스택은 필요에 따라 HPC/클라우드 리소스를 획득하고
              효과적으로 관리하는 스마트 메커니즘으로 강화되어 이기종 컴퓨팅
              리소스에서 작업을 쉽게 공동 배치할 수 있습니다.
            </Typography>
          </Box>
        </Container>
      </div>
    )
  })
)
export default LandingPage
