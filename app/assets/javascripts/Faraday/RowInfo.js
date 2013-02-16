RowInfo.ROW_NORMAL = 0;
RowInfo.ROW_CONST = 1;
RowInfo.ROW_EQUAL = 2;

function RowInfo() {

    this.type = RowInfo.ROW_NORMAL;

    this.nodeEq = 0;
    this.type = 0;
    this.mapCol = 0;
    this.mapRow = 0;

    this.value = 0;
    this.rsChanges = false;
    this.lsChanges = false;
    this.dropRow = false;

};