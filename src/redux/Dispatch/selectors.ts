import { createSelector } from '@reduxjs/toolkit';

import { filterTasks } from '../logistics/utils';
import { getTaskListTasks } from '../../shared/src/logistics/redux/taskListUtils';
import {
  selectTaskLists,
  selectTasksEntities,
  selectUnassignedTasksNotCancelled,
} from '../../shared/logistics/redux';
import { selectTaskFilters } from '../Courier/taskSelectors';
import { Uri } from '@/src/redux/api/types';

export const selectIsDispatchFetching = createSelector(
  state => state.logistics.ui.isAssigningTasks,
  state => state.logistics.ui.isFetching,
  state => state.logistics.ui.taskListsLoading,
  (isAssigningTasks, isFetching, taskListsLoading) =>
    isAssigningTasks || isFetching || taskListsLoading,
);

// use selectTaskFilters with "tags" eliminated (is not used in Dispatch)
export const selectDispatchUiTaskFilters = createSelector(
  selectTaskFilters,
  taskFilters =>
    taskFilters.filter(taskFilter => !Object.keys(taskFilter).includes('tags')),
);

export const selectKeywordFilters = state => state.dispatch.ui.keywordFilters;

export const selectAllDispatchFilters = createSelector(
  selectDispatchUiTaskFilters,
  selectKeywordFilters,
  (uiFilters, keywordFilters) => [...uiFilters, ...keywordFilters],
);

export const selectFilteredUnassignedTasksNotCancelled = createSelector(
  selectUnassignedTasksNotCancelled,
  selectAllDispatchFilters,
  (tasks, filters) => filterTasks(tasks, filters),
);

export const selectFilteredTaskLists = createSelector(
  selectTaskLists,
  selectTasksEntities,
  selectAllDispatchFilters,
  (taskLists, taskEntities, filters) =>
    taskLists.map(taskList => {
      const tasks = getTaskListTasks(taskList, taskEntities);
      const filteredTasks = filterTasks(tasks, filters);
      return { ...taskList, tasksIds: filteredTasks.map(task => task['@id']) };
    }),
);

export const selectSelectedTasks = state => state.dispatch.ui.selectedTasks;

export const selectExpandedSections = state => state.dispatch.ui.expandedSections;
export const selectIsExpandedSection = createSelector(
  selectExpandedSections,
  expandedSections => sectionTitle => {
    return expandedSections[sectionTitle] === true;
  }
);

export const selectAllTasksIdsFromOrders = createSelector(
  selectSelectedTasks,
  selectedTasks => {
    const orders = selectedTasks?.orders || {};

    return Object.values(orders).flatMap(taskList =>
      Object.values(taskList).map(task => task['@id']),
    );
  },
);

export const selectAllTasksIdsFromTasks = createSelector(
  selectSelectedTasks,
  selectedTasks => {
    const tasks = selectedTasks?.tasks || {};

    return Object.values(tasks).flatMap(taskList =>
      Object.values(taskList).map(task => task['@id']),
    );
  },
);

// https://redux.js.org/usage/deriving-data-selectors#selector-factories
export const makeIsSelectedTaskFromOrders = (taskUri: Uri) => {
  const selectIsSelectedTaskFromOrders = createSelector(
    selectAllTasksIdsFromOrders,
    (allTasksIdsFromOrders) => allTasksIdsFromOrders.includes(taskUri),
  );

  return selectIsSelectedTaskFromOrders;
}

// https://redux.js.org/usage/deriving-data-selectors#selector-factories
export const makeIsSelectedTaskFromTasks = (taskUri: Uri) => {
  const selectIsSelectedTaskFromTasks = createSelector(
    selectAllTasksIdsFromTasks,
    (allTasksIdsFromTasks) => allTasksIdsFromTasks.includes(taskUri),
  );

  return selectIsSelectedTaskFromTasks;
}
