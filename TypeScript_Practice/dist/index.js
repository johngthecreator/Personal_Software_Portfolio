"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DrugIndex {
    async getDrugInfo() {
        const res1 = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${this.drug1}`);
        const rawData1 = await res1.json();
        const drugData1 = rawData1.drugGroup.conceptGroup[1].conceptProperties[0];
        if (drugData1) {
            console.log(`A potential counter part is ${drugData1.name} with an RX ID of ${drugData1.rxcui}`);
        }
    }
}
const drugArray = ["lexapro", "fentanyl", "glucophage", "norvasc"];
const drugCompare = new DrugIndex();
drugArray.map((drug) => {
    drugCompare.drug1 = drug;
    drugCompare.getDrugInfo();
});
// finds the sum of the array using recursion and tests the efficiency of recursion against the map function
const findSum = (A, N) => {
    if (N <= 0)
        return 0;
    return (findSum(A, N - 1) + A[N - 1]);
};
const A = [1, 2, 3, 4, 5];
const N = A.length;
console.log(findSum(A, N));
//# sourceMappingURL=index.js.map