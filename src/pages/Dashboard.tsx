import { Box } from '@mui/material';
import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import InstrumentationSection from '../components/InstrumentationSection';
import ChartsSection from '../components/ChartsSection';
import SiteFooter from '../components/SiteFooter';
import { jupiterPalette } from '../theme/theme';
import DescentDepthChart from "../components/charts/DescentDepthChart";

const Dashboard = () => (
  <Box
    sx={{
      minHeight: '100vh',
      overflowX: 'hidden',
      backgroundColor: jupiterPalette.void,
      backgroundImage: `
        radial-gradient(1px 1px at 20px 30px, rgba(233,217,183,0.5), transparent),
        radial-gradient(1px 1px at 120px 90px, rgba(233,217,183,0.35), transparent),
        radial-gradient(1.5px 1.5px at 220px 40px, rgba(111,227,214,0.4), transparent),
        radial-gradient(1px 1px at 300px 150px, rgba(233,217,183,0.3), transparent),
        radial-gradient(1.5px 1.5px at 60px 180px, rgba(233,217,183,0.4), transparent)
      `,
      backgroundRepeat: 'repeat',
      backgroundSize: '340px 220px',
    }}
  >
    <TopBar />
    <HeroSection />
    <ChartsSection />
    <DescentDepthChart />
    <SiteFooter />
  </Box>
);

export default Dashboard;
