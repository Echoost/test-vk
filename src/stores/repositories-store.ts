import {
    getRepositories,
    IRepositories,
} from '@/components/api/getRepositories';
import { makeAutoObservable, runInAction } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

class RepositoriesStore {
    repositoriesFromPromise?: IPromiseBasedObservable<IRepositories[]> = null;
    data: IRepositories[] = [];
    filteredData: IRepositories[] = [];
    filterActive = false;

    constructor() {
        makeAutoObservable(this);
    }

    getRepositoriesAction = (page: number) => {
        const newRepositoriesPromise = getRepositories(page);
        this.repositoriesFromPromise = fromPromise(
            newRepositoriesPromise.then(newRepositories => {
                runInAction(() => {
                    this.data = [...this.data, ...newRepositories];
                    if (!this.filterActive) {
                        this.filteredData = [...this.data];
                    }
                });
                return this.data;
            }),
        );
    };
    deleteRepository = (id: number) => {
        runInAction(() => {
            this.data = this.data.filter(repository => repository.id !== id);

            if (this.filterActive) {
                this.filteredData = this.filteredData.filter(
                    repository => repository.id !== id,
                );
            } else {
                this.filteredData = [...this.data];
            }
        });
    };

    editRepository = (id: number, newName: string) => {
        runInAction(() => {
            const repository = this.data.find(repo => repo.id === id);
            if (repository) {
                repository.name = newName;
            }
        });
    };

    filterByYearRange = (startYear: number, endYear: number) => {
        runInAction(() => {
            this.filterActive = startYear && endYear ? true : false;
            if (this.filterActive) {
                this.filteredData = this.data.filter(repository => {
                    const createdYear = new Date(
                        repository.created_at,
                    ).getFullYear();
                    return createdYear >= startYear && createdYear <= endYear;
                });
            } else {
                this.filteredData = [...this.data];
            }
        });
    };
}

export default new RepositoriesStore();
