import { Home as _Home } from '../components/pages/home';
import type { Route } from './+types/home';

export function meta(_args: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' }
    ];
}

export default function Home() {
    return <_Home />;
}
