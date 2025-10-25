export interface SecondaryCondition {
  key: string;
  operator: ConditionOperations;
  value: number | string | Date | string[] | number[] | Date[];
}

export enum ConditionOperations {
  GreaterThan = 'greater_than',
  LessThan = 'less_than',
  Equals = 'equals',
  NotEquals = 'not_equals',
  GreaterThanOrEqualTo = 'greater_than_or_equal_to',
  LessThanOrEqualTo = 'less_than_or_equal_to',
  EqualTo = 'equal_to',
  NotEqualTo = 'not_equal_to',
  IN = 'in'
}

export type IncludeAttributes = {
  modelName: any;
  alias?: string;
  attributes?: string[];
  required?: boolean;
  include?: IncludeAttributes[];
};

export interface OrderAttributes {
  column: string;
  operation: OrderOperation;
}

export enum OrderOperation {
  Assending = 'assending',
  Desending = 'desending'
}