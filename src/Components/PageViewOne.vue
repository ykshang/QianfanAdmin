<template>
	<div style="display: flex; flex-direction: column; height: 100%;">
		<div class="option-container">
			<div>
				<el-form v-if="queryFields && queryFields.length > 0"
								 :inline="true"
								 :model="queryParams"
								 class="demo-form-inline">
					<el-form-item v-for="fildItem in queryFields"
												:key="fildItem"
												:label="fildItem.label">
						<component :is="queryTemplates[fildItem.type??'input']??''"
											 v-model="queryParams[fildItem.fieldName]"
											 v-bind="fildItem.attr" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
											 @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="option-btns">
				<el-button type="primary">新增</el-button>
				<el-button type="success">修改</el-button>
				<el-button type="warning">删除</el-button>
			</div>
		</div>
		<el-table :data="tableData"
							style="width: 100%;flex:1;">
			<el-table-column prop="date"
											 label="日期"
											 width="180" />
			<el-table-column prop="name"
											 label="明自" />
			<el-table-column prop="address"
											 label="地址" />
			<el-table-column align="right"
											 width="180">
				<template #header>
					<el-dropdown>
						<el-button link>
							<i class="iconfont icon-gengduoshezhicaidan" />
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>Action 1</el-dropdown-item>
								<el-dropdown-item>Action 2</el-dropdown-item>
								<el-dropdown-item>Action 3</el-dropdown-item>
								<el-dropdown-item disabled>Action 4</el-dropdown-item>
								<el-dropdown-item divided>Action 5</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
				<template #default="scope">
					<el-button link
										 @click="handleEdit(scope.$index, scope.row)">
						编辑
					</el-button>
					<el-button link
										 type="danger"
										 @click="handleDelete(scope.$index, scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagin />
	</div>
</template>
<script setup name="PageViewOne">
import { resolveComponent, watch, computed, defineModel, ref, onMounted } from 'vue';
const { tableData = [], queryFields = [] } = defineProps({
	tableData: {
		type: Array,
		default: () => [],
	},
	queryFields: {
		required: false,
		type: Object,
	},
});
// const queryParams = ref({
// 	keyName: ''
// })
const queryParams = defineModel('queryParams');
const initFields = () => {
	queryFields.forEach(item => {
		queryParams.value[item.fieldName] = item.defaultValue ?? undefined;
	});
}
const onSubmit = () => {

}
const queryTemplates = {
	input: resolveComponent('el-input'),
	cascader: resolveComponent('el-cascader'),
	select: resolveComponent('el-select'),
	switch: resolveComponent('el-switch'),
	timePicker: resolveComponent('el-time-picker'),
	timeSelect: resolveComponent('el-time-select'),
	treeSelect: resolveComponent('el-tree-select'),
}
onMounted(() => {
	initFields();
})
</script>
<style lang="scss" scoped>
.option-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.option-btns {
	max-width: fit-content;
	min-width: fit-content;
	text-align: end;
	height: -webkit-fill-available;
	height: fill-available;
}
</style>
