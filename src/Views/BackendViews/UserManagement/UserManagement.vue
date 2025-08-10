<template>
	<PageContainer>
		<template #Default>
			<PageViewOne :queryFields="queryFields"
									 v-model:queryParams="queryParams"
									 :tableData="tableData" />
		</template>
	</PageContainer>
</template>
<script setup name="UserManagement">
import { ref, reactive, defineAsyncComponent } from 'vue';
const queryParams = ref({
	keyName: ''
})
// 查询条件部分
// 按钮区域
// 数据部分、分页部分（当前页、页大小、是否可以上一页、是否可以下一页、总页数、总数据条数）
const queryFields = ref([
	{ label: '关键字', fieldName: 'keyName', type: 'input', attr: { maxlength: 10, placeholder: '请输入关键字' } }]
);
const tableData = Array.from({ length: 30 }).map((_) => ({
	date: new Date().toLocaleDateString(),
	name: 'Tom',
	address: 'No. 189, Grove St, Los Angeles',
}))
const formInline = reactive({
	user: '',
	region: '',
	date: '',
})
const onSubmit = () => {
	console.log('submit!')
}
/**
 * 查询条件、操作按钮区、表格、筛选列、分页
 * 
 */
const pageConfig = reactive({
	query: {
		fields: [{}]
	},
	operationBtns: {},
	table: {},
	filter: {},
	pagination: {}
})
</script>
<style lang="scss" scoped>
</style>
