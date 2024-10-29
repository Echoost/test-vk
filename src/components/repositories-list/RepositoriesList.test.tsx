import { render, screen, act } from '@testing-library/react';
import { RepositoriesList } from './RepositoriesList';
import RepositoriesStore from '@/stores/repositories-store';
import { Provider } from 'mobx-react';

describe('RepositoriesList', () => {
    test('renders repository list', async () => {
        RepositoriesStore.data = [
            {
                id: 1,
                name: 'Test Repo 1',
                owner: {
                    html_url: 'url1',
                    login: 'login1',
                    avatar_url: 'avatar1',
                },
                created_at: '2022-01-01',
            },
            {
                id: 2,
                name: 'Test Repo 2',
                owner: {
                    html_url: 'url2',
                    login: 'login2',
                    avatar_url: 'avatar2',
                },
                created_at: '2023-01-01',
            },
        ];
        RepositoriesStore.filteredData = RepositoriesStore.data;

        await act(async () => {
            render(
                <Provider RepositoriesStore={RepositoriesStore}>
                    <RepositoriesList />
                </Provider>,
            );
        });

        expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
    });
});
