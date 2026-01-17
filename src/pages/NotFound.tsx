
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center">
            <Section className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-slate-400 mb-8">Page not found.</p>
                <Link to="/">
                    <Button>Return Home</Button>
                </Link>
            </Section>
        </div>
    );
};

export default NotFound;
