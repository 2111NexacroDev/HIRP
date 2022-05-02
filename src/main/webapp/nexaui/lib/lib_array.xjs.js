//XJS=lib_array.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        /*
        	////////////////////////////////////////////////////////////////////////////////////////////////////
        		FUNCTION LIST
        	////////////////////////////////////////////////////////////////////////////////////////////////////

        	1. gfnArrayEach					: 배열의 각 항목에 대해 주어진 콜백 함수를 호출한다
        									(주어진 함수에서 return false 처리 되면 임의 배열 항목에서 반복이 멈춘다)
        	2. gfnArrayForEach				: 배열의 각 항목에 대해 주어진 콜백 함수를 호출한다
        									(주어진 함수의 return값과 상관없이 각 항목에 대해서 모두 처리한다)
        	3. gfnArrayIndexOf				: 지정된 항목이 처음 나오는 배열 위치를 반환한다
        	4. gfnArrayLastIndexOf			: 지정된 항목이 처음 나오는 배열 위치를 뒤에서부터 찾아 반환한다
        	5. gfnArrayContains				: 지정된 항목이 배열에 포함되어 있는지 확인한다
        	6. gfnArrayToArray				: 배열 형태로 변환 처리한다
        	7. gfnArrayMap					: 배열의 모든 항목을 인자로 사용해서 제공하는 함수의 호출 결과로 새로운 배열을 작성한다
        	8. gfnArrayEvery				: 함수가 false값을 리턴 할 때까지 각 배열 항목을 이용한 callback함수를 실행한다
        	9. gfnArraySome					: 함수가 true값을 리턴 할 때까지 각 배열 항목을 이용한 callback함수를 실행한다
        	10. gfnArrayEquals				: 두 1차원 배열의 항목값이 일치하는지 비교한다
        	11. gfnArrayClean				: 배열의 빈 항목을 제거한다
        	12. gfnArrayUnique				: 유일한 항목을 찾아 새로운 배열로 구성해서 리턴한다
        	13. gfnArrayFilter				: 대상 배열에서 Callback함수 조건을 만족하는 항목으로 새로운 배열을 구성한다
        	14. gfnArrayInsertAt			: 원하는 위치에 새로운 항목을 insert처리한다
        	15. gfnArrayInsertBefore		: 원하는 항목의 앞 위치에 새로운 항목을 insert처리한다
        	16. gfnArrayRemoveAt			: 원하는 위치의 항목을 배열에서 삭제 처리한다
        	17. gfnArrayRemove				: 원하는 항목을 배열에서 삭제 처리한다
        	18. gfnArrayClone				: 배열을 복사한다
        	19. gfnArrayReduce				: 배열의 순서대로 각 요소들을 각 요소별 호출함수로 처리하여 하나의 값으로 감소한다
        									(각 요소별로 호출되는 함수는, 4개의 argument을 가진다)
        	20. gfnArrayFlatten				: 1차원 배열로 재정의한다
        	21. gfnArrayMax					: 배열중에 가장 큰 값을 리턴한다
        	22. gfnArrayMin					: 배열중에 가장 작은 값을 리턴한다
        	23. gfnArraySum					: 배열의 모든 항목에 대한 합계를 구한다
        	24. gfnArrayExchange			: 지정된 두 항목의 위치을 바꾼다
        	25. gfnArrayMove				: 지정된 항목을 원하는 위치로 이동시킨다
        	26. gfnArraySortOn				: 배열 항목의 필드를 기준으로 배열 항목을 정렬 처리한다
        	27. gfnArraySortTwoDimensional	: 이차원 배열의 이차 요소별로 정렬하여 새로운 배열을 반환하다
        	28. gfnArrayIndexOfProp			: 지정된 속성의 값이 처음으로 일치하는 객체의 배열 위치를 반환한다
        	29. gfnArrayLastIndexOfProp		: 지정된 속성의 값이 처음으로 일치하는 객체의 배열 위치를 뒤에서부터 찾아 반환한다
        	30. gfnArrayDifference			: 배열 arr에서 배열 arr1의 모든 항목을 뺀 차 집합 배열을 리턴한다
        	31. gfnArrayArrayCopy			: source Array의 시작 index로 주어진 length길이만큼 요소들을 destination Array의 시작 index에서 부터 복사한다
        */

        this._rtnFlatten = [];	//gfnArrayFlatten method에서 사용하는 1차원 배열 저장소.

        /**
        * 배열의 각 항목에 대해 주어진 콜백 함수를 호출한다.<br>
        * 주어진 함수에서 return false 처리 되면 임의 배열 항목에서 반복이 멈춘다.
        * @param {array} array 처리 대상 Array.
        * @param {function} func callback 함수.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @param {boolean=} reverse 반복순서 (default: false).
        * @return {boolean | number} 배열 항목 모두가 처리되면 true를 리턴, 함수 처리중에 return false를 하게 되면 false 처리된 배열 index를 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var result = this.gfnArrayEach(mon, function(name, index) {
        * 	trace(index + "==>" + name);
        *	// output : 0==>Jan
        *	// output : 1==>Feb
        *	// output : 2==>Mar
        *	// output : 3==>Apr
        * });
        * trace(result);	// output : true
        *
        * var result = this.gfnArrayEach(mon, function(name, index) {
        *	trace(index + "==>" + name);
        *	// output : 0==>Jan
        *	// output : 1==>Feb
        *	if (name === 'Mar')
        *	{
        *		trace("break here!");
        *		// output : break here!
        *		return false;
        *	}
        * });
        * trace(result);	// output : 2
        * @memberOf this
        */
        this.gfnArrayEach = function(array, func, scope, reverse)
        {
        	var i, len = array.length;

        	if (reverse !== true)
        	{
        		for (i = 0; i < len; i++)
        		{
        			if (func.call(scope || array[i], array[i], i, array) === false)
        			{
        				return i;
        			}
        		}
        	}
        	else
        	{
        		for (i = len - 1; i > -1; i--)
        		{
        			if (func.call(scope || array[i], array[i], i, array) === false)
        			{
        				return i;
        			}
        		}
        	}

        	return true;
        }

        /**
        * 배열의 각 항목에 대해 주어진 콜백 함수를 호출한다.<br>
        * 주어진 함수의 return값과 상관없이 각 항목에 대해서 모두 처리한다.
        * @param {array} array 처리 대상 Array
        * @param {function} func callback 함수
        * @param {object=} scope callback 함수에 대한 수행 scope
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * this.gfnArrayForEach(mon, function(name, index) {
        * 	if (name === 'Mar')
        *	{
        * 		trace("don't break here!");
        *		// output : don't break here!
        * 		return false;
        * 	}
        * 	trace(index + "==>" + name);
        *	// output : 0==>Jan
        *	// output : 1==>Feb
        *	// output : 3==>Apr
        * });
        * @memberOf this
        */
        this.gfnArrayForEach = function(array, func, scope)
        {
        	var i, len = array.length;

        	for (i = 0; i < len; i++)
        	{
        		func.call(scope, array[i], i, array);
        	}
        }

        /**
        * 지정된 항목이 처음 나오는 배열 위치를 반환한다.
        * @param {array} array 검색 대상 Array.
        * @param {object} item 찾고자 하는 Item.
        * @param {number=} from 검색의 시작 위치 (default: 0).
        * @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false).
        * @return {number} 검색된 배열 위치. 없다면 -1 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var index = this.gfnArrayIndexOf(mon, "Mar");
        * trace("index==>" + index);	// output : index==>2
        * var index = this.gfnArrayIndexOf(mon, "May");
        * trace("index==>" + index);	// output : index==>-1
        * @memberOf this
        */
        this.gfnArrayIndexOf = function(array, item, from, strict)
        {
        	var len = array.length;
        	if ( from == null ) from = 0;;
        	strict == !!strict;
        	from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        	if (from < 0)
        	{
        		from += len;
        	}

        	if (strict)
        	{
        		for (; from < len; from++)
        		{
        			if ( array[from] === item)
        			{
        				return from;
        			}
        		}
        	}
        	else
        	{
        		for (; from < len; from++)
        		{
        			if ( array[from] == item)
        			{
        				return from;
        			}
        		}
        	}

        	return -1;
        }

        /**
        * 지정된 항목이 처음 나오는 배열 위치를 뒤에서부터 찾아 반환한다.
        * @param {array} array 검색 대상 Array.
        * @param {object} item 찾고자 하는 Item.
        * @param {number=} from 검색 시작 위치 (default: Last Index).
        * @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false).
        * @return {number} 검색된 배열 위치. 없다면 -1 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var index = this.gfnArrayLastIndexOf(mon, "Mar");
        * trace("index==>" + index);	// output : index==>2
        * var index = this.gfnArrayLastIndexOf(mon, "May");
        * trace("index==>" + index);	// output : index==>-1
        * @memberOf this
        */
        this.gfnArrayLastIndexOf = function(array, item, from, strict)
        {
        	var i;

        	if (from == null)
        	{
        		from = array.length - 1;
        	}
        	else if (from < 0)
        	{
        		from = Math.max(0, array.length + from);
        	}

        	var strict = strict || false;

        	if (strict)
        	{
        		for (i=from; i>=0; i--)
        		{
        			if (array[i] === item)
        			{
        				return i;
        			}
        		}
        	}
        	else
        	{
        		for (i=from; i>=0; i--)
        		{
        			if (array[i] == item)
        			{
        				return i;
        			}
        		}
        	}

        	return -1;
        }

        /**
        * 지정된 항목이 배열에 포함되어 있는지 확인한다.
        * @param {array} array 검색 대상 Array.
        * @param {object} item 찾고자 하는 Item.
        * @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false).
        * @return {boolean} 포함되어 있다면 true, 없다면 false를 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var contain = this.gfnArrayContains(mon, "Mar");
        * trace("contain==>" + contain);	// output : contain==>true
        * var contain = this.contains(mon, "May");
        * trace("contain==>" + contain);	// output : contain==>false
        * @memberOf this
        */
        this.gfnArrayContains = function(array, item, strict)
        {
        	if (this.gfnArrayIndexOf(array, item, null, strict) === -1)
        	{
        		return false;
        	}
        	else
        	{
        		return true;
        	}
        }

        /**
        * 배열 형태로 변환 처리한다.
        * @param {object} iterant 변환 대상 Obejct.
        * @param {number=} start 시작 위치 (default: start Index).
        * @param {number=} end 끝 위치 (default: end Index).
        * @return {array} 변환된 Array.
        * @example
        * this.fn_mon("Jan","Feb","Mar","Apr");
        * this.fn_mon = function()
        * {
        * 	var result = this.gfnArrayToArray(arguments);
        *	trace("result==>" + result);	// output : result==>[Jan,Feb,Mar,Apr]
        * }
        *
        * var result = this.gfnArrayToArray("ABCDEFG",1,3);
        * trace("result==>" + result);	// output : result==>[B,C]
        * @memberOf this
        */
        this.gfnArrayToArray = function(iterant, start, end)
        {
        	if (!iterant || !iterant.length)
        	{
        		return [];
        	}

        	if ( this.gfnIsArray(iterant) )
        	{
        		if ( arguments.length == 1 ) return iterant;
        		else if ( arguments.length == 2 ) return iterant.slice(start);
        		else return iterant.slice(start, end);
        	}

        	if (typeof iterant === "string")
        	{
        		iterant = iterant.split("");
        	}

        	var i, array = [],
        	start = start || 0;

        	end = end ? ((end < 0) ? iterant.length + end : end) : iterant.length;

        	for (i = start; i < end; i++)
        	{
        		array.push(iterant[i]);
        	}

        	return array;
        }

        /**
        * 배열의 모든 항목을 인자로 사용해서 제공하는 함수의 호출 결과로 새로운 배열을 작성한다.
        * @param {array} array 처리 대상 Array.
        * @param {function} func callback 함수.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @return {array} callback 함수 결과를 담은 Array.
        * @example
        * var counts = [2, 10, 5, 1];
        * var map = this.gfnArrayMap(counts, function(ele){return ele * 1000;});
        * trace("result==>" + result);	// output : result==>[2000,10000,5000,1000]
        * @memberOf this
        */
        this.gfnArrayMap = function(array, func, scope)
        {
        	if (!func || !(typeof func === "function"))
        	{
        		return;
        	}

        	var results = [],
        		i = 0, len = array.length;

        	for (; i < len; i++)
        	{
        		results[i] = func.call(scope, array[i], i, array);
        	}

        	return results;
        }

        /**
        * 함수가 false값을 리턴 할 때까지 각 배열 항목을 이용한 callback함수를 실행한다.
        * @param {array} array 처리 대상 Array.
        * @param {function} func callback 함수.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @return {boolean} callback 함수 처리 결과값. false로 리턴되는 항목이 발견되면 바로 false를 리턴, 그렇지 않으면 true를 리턴.
        * @example
        * var counts = [2, 10, 5, 1];
        * var every = this.gfnArrayEvery(counts, function(ele){return (ele > 0);});
        * trace("every==>" + every);	// output : every==>true
        * var every = this.gfnArrayEvery(counts, function(ele){return (ele < 5);});
        * trace("every==>" + every);	// output : every==>false
        * @memberOf this
        */
        this.gfnArrayEvery = function(array, func, scope)
        {
        	if (!func || !(typeof func === "function"))
        	{
        		return;
        	}

        	var i = 0, len = array.length;

        	for (; i < len; ++i)
        	{
        		if (!func.call(scope, array[i], i, array))
        		{
        			return false;
        		}
        	}

        	return true;
        }

        /**
        * 함수가 true값을 리턴 할 때까지 각 배열 항목을 이용한 callback함수를 실행한다.
        * @param {array} array 처리 대상 Array.
        * @param {function} func callback 함수.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @return {boolean} callback 함수 처리 결과값. true로 리턴되는 항목이 발견되면 바로 true를 리턴, 그렇지 않으면 false를 리턴.
        * @example
        * var counts = [2, 10, 5, 1];
        * var some = this.gfnArraySome(counts, function(ele){return (ele > 5);});
        * trace("some==>" + some);	// output : some==>true
        * var some = this.gfnArraySome(counts, function(ele){return (ele > 10);});
        * trace("some==>" + some);	// output : some==>false
        * @memberOf this
        */
        this.gfnArraySome = function(array, func, scope)
        {
        	if (!func || !(typeof func === "function"))
        	{
        		return;
        	}

        	var i = 0, len = array.length;

        	for (; i < len; ++i)
        	{
        		if (func.call(scope, array[i], i, array))
        		{
        			return true;
        		}
        	}

        	return false;
        }

        /**
        * 두 1차원 배열의 항목값이 일치하는지 비교한다.
        * @param {array} array1 대상 Array.
        * @param {array} array2 비교 대상 Array.
        * @return {boolean} 모든 항목값이 같은면 true, 그렇지 않으면 false.
        * @example
        * var counts = [2, 10, 5, 1];
        * var equals = this.gfnArrayEquals(counts, [2, 10, 5, 1]);
        * trace("equals==>" + equals);	// output : equals==>true
        * var equals = this.gfnArrayEquals(counts, [2, 10, 5]);
        * trace("equals==>" + equals);	// output : equals==>false
        * @memberOf this
        */
        this.gfnArrayEquals = function(array1, array2)
        {
        	var i, len1 = array1.length,
        		len2 = array2.length;

        	if (array1 === array2)
        	{
        		return true;
        	}

        	if (len1 !== len2)
        	{
        		return false;
        	}

        	for (i = 0; i < len1; ++i)
        	{
        		if (array1[i] !== array2[i])
        		{
        			return false;
        		}
        	}

        	return true;
        }

        /**
        * 배열의 빈 항목을 제거한다.
        * @param {array} array 처리 대상 Array.
        * @return {array} clean 처리 된 Array.
        * @example
        * var clean = this.gfnArrayClean(["A", undefined, "B", null, "C", , "D"]);
        * trace("clean==>" + clean);	// output : clean==>["A","B","C","D"]
        * @memberOf this
        */
        this.gfnArrayClean = function(array)
        {
        	var results = [], i = 0,
        		len = array.length, item;

        	for (; i < len; i++)
        	{
        		item = array[i];

        		if (!this.gfnIsEmpty(item))
        		{
        			results.push(item);
        		}
        	}

        	return results;
        }

        /**
        * 유일한 항목을 찾아 새로운 배열로 구성해서 리턴한다.
        * @param {array} array 처리 대상 Array.
        * @return {array} unique한 항목으로 새로 구성된 Array.
        * @example
        * var unique = this.gfnArrayUnique(["A","B","C","A","A","B"]);
        * trace("unique==>" + unique);	// output : unique==>["A","B","C"]
        * @memberOf this
        */
        this.gfnArrayUnique = function(array)
        {
        	var i = 0, uniqueArray = [],
        		len = array.length,
        		item,
        		findKey = {},
        		pThis = this;

        	for (; i < len; i++)
        	{
        		item = array[i];
        		findKey[item] = item;
        	}
        	for ( i in findKey ) uniqueArray.push(findKey[i]);

        	return uniqueArray;
        }

        /**
        * 대상 배열에서 Callback함수 조건을 만족하는 항목으로 새로운 배열을 구성한다.
        * @param {array} array 처리 대상 Array.
        * @param {function} func callback 함수.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @return {array} filter처리된 항목으로 새로 구성된 Array.
        * @example
        * var counts = [2, 10, 5, 1];
        * var filter = this.gfnArrayFilter(counts, function(ele){return (ele > 3);});
        * trace("filter==>" + filter);	// output : filter==>[10,5]
        * @memberOf this
        */
        this.gfnArrayFilter = function(array, func, scope)
        {
        	if (!func || !(typeof func === "function"))
        	{
        		return;
        	}

        	var results = [],
        		i = 0,
        		len = array.length;

        	for (; i < len; i++)
        	{
        		if (func.call(scope, array[i], i, array))
        		{
        			results.push(array[i]);
        		}
        	}

        	return results;
        }

        /**
        * 원하는 위치에 새로운 항목을 insert처리한다.
        * @param {array} array insert 대상 Array.
        * @param {number} index insert 위치.
        * @param {object} items insert하고자 하는 items.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * this.gfnArrayInsertAt(mon, 1, [50,100]);
        * trace("mon==>" + mon);	// output : mon==>["Jan", 50, 100, "Feb", "Mar", "Apr"]
        * @memberOf this
        */
        this.gfnArrayInsertAt = function(array, index, items)
        {
        	array.splice(index, 0, items);
        }

        /**
        * 원하는 항목의 앞 위치에 새로운 항목을 insert처리한다.
        * @param {array} array insert 대상 Array.
        * @param {object} items insert하고자 하는 items.
        * @param {object} items2 insert 위치(이 item 앞에 위치시킴).
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * this.gfnArrayInsertBefore(mon, [50,100], "Feb");
        * trace("mon==>" + mon);	// output : mon==>["Jan", 50, 100, "Feb", "Mar", "Apr"]
        * @memberOf this
        */
        this.gfnArrayInsertBefore = function(array, items, items2)
        {
        	var index = this.gfnArrayIndexOf(array, items2);
        	if (index == -1)
        	{
        		array.push(items);
        	}
        	else
        	{
        		array.splice(index, 0, items);
        	}
        }

        /**
        * 원하는 위치의 항목을 배열에서 삭제 처리한다.
        * @param {array} array remove 대상 Array.
        * @param {number} index remove하고자 하는 item index.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * this.gfnArrayRemoveAt(mon, 1);
        * trace("mon==>" + mon);	// output : mon==>["Jan","Mar","Apr"]
        * @memberOf this
        */
        this.gfnArrayRemoveAt = function(array, index)
        {
        	array.splice(index, 1);
        }

        /**
        * 원하는 항목을 배열에서 삭제 처리한다.
        * @param {array} array remove 대상 Array.
        * @param {object} item remove하고자 하는 item.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * this.gfnArrayRemove(mon, "Feb");
        * trace("mon==>" + mon);	// output : mon==>["Jan","Mar","Apr"]
        * @memberOf this
        */
        this.gfnArrayRemove = function(array, item)
        {
        	var index = this.gfnArrayIndexOf(array, item);

        	if (index !== -1)
        	{
        		array.splice(index, 1);
        	}
        }

        /**
        * 배열을 복사한다.
        * @param {array} array 복사 대상 Array.
        * @return {array} 복사된 Array.
        * @example
        * var counts = [2, 10, 5, 1];
        * var clone = this.gfnArrayClone(counts);
        * trace("clone==>" + clone);	// output : clone==>[2,10,5,1]
        * @memberOf this
        */
        this.gfnArrayClone = function(array)
        {
        	return array.slice(0);
        }

        /**
        * 배열의 순서대로 각 요소들을 각 요소별 호출함수로 처리하여 하나의 값으로 감소한다.
        * 각 요소별로 호출되는 함수는, 4개의 argument을 가진다.
        * <pre>
        *    previousValue : 현재 처리 전의 값.
        *    currentValue: 현재 값.
        *    index: 현재 처리하는 array index.
        *    arr : 처리하는 대상 array.
        * </pre>
        * @param {array} arr 대상 Array.
        * @param {function} fn 배열의 각 요소별로 호출되는 함수.
        * @param {*=} initValue 초기 지정하는 값.
        * @return {*} 감소 처리된 결과.
        * @example
        * var arr = [0, 1, 2, 3];
        * var total = this.gfnArrayReduce(arr, function(a, b) {
        *     return a + b;
        * });
        * trace("total==>" + total);	// output : total==>6
        * var arr = [[0, 1], [2, 3], [4, 5]];
        * var flattened = this.gfnArrayReduce(arr, function(a, b) {
        *     return a.concat(b);
        * });
        * trace("flattened==>" + flattened);	// output : flattened==>[0, 1, 2, 3, 4, 5]
        * @memberOf this
        * @function reduce
        */
        this.gfnArrayReduce = Array.prototype.reduce ? function(arr, fn, initValue)
        {
        	if(this.gfnIsEmpty(initValue)) {
        		return arr.reduce(fn);
        	} else {
        		return arr.reduce(fn, initValue);
        	}
        } :
        function(arr, fn, initValue)
        {
        	if ( arr == null )
        	{
        		trace("arr is null or undefined !!");
        		return;
        	}
        	if (typeof fn !== 'function')
        	{
        		trace("Type of fn is not function!!");
        		return;
        	}
        	var len = arr.length >>> 0,
        		k = 0,
        		value;
        	if (arguments.length == 3)
        	{
        		value = arguments[2];
        	}
        	else
        	{
        		while (k < len && (arr[k] == null))
        		{
        			k++;
        		}
        		if (k >= len)
        		{
        			trace("Reduce of empty array with no initial value.");
        			return;
        		}
        		value = arr[k++];
        	}
        	for (; k < len; k++)
        	{
        		if (arr[k] != null)
        		{
        			value = fn(value, arr[k], k, arr);
        		}
        	}
        	return value;
        };

        /**
        * 1차원 배열로 재정의한다.
        * @param {array} array 처리 대상 배열.
        * @return {array} 1차원 Array.
        * @example
        * var flatten = this.gfnArrayFlatten(['Jan', [10, 20], ['Feb', [1, 10]]]);
        * trace("flatten==>" + flatten);	// output : flatten==>[Jan,10,20,Feb,1,10]
        * @memberOf this
        */
        this.gfnArrayFlatten = function(array)
        {
        	_rtnFlatten = [];
        	return this._flatten(array);
        }

        /**
        * 1차원 배열로 재정의한다.
        * @private
        * @param {array} array 처리 대상 배열.
        * @return {array} 1차원 Array.
        * @memberOf this
        */
        this._flatten = function(array)
        {
        	var i, len,
        		v, pThis = this;

        	for (i = 0, len = array.length; i < len; i++)
        	{
        		v = array[i];

        		if (this.gfnIsArray(v))
        		{
        			pThis._flatten(v);
        		}
        		else
        		{
        			_rtnFlatten.push(v);
        		}
        	}

        	return _rtnFlatten;
        };

        /**
        * 배열중에 가장 큰 값을 리턴한다.
        * @param {array} array 검색 대상 배열.
        * @return {number} maximum Value.
        * @example
        * var counts = [2, 10, 5, 1];
        * var max = this.gfnArrayMax(counts);
        * trace("max==>" + max);	// output : max==>10
        * @memberOf this
        */
        this.gfnArrayMax = function(array)
        {
        	return Math.max.apply(Math, array);
        }

        /**
        * 배열중에 가장 작은 값을 리턴한다.
        * @param {array} array 검색 대상 배열.
        * @return {number} minimum Value.
        * @example
        * var counts = [2, 10, 5, 1];
        * var min = this.gfnArrayMin(counts);
        * trace("min==>" + min);	// output : min==>1
        * @memberOf this
        */
        this.gfnArrayMin = function(array)
        {
        	return Math.min.apply(Math, array);
        }

        /**
        * 배열의 모든 항목에 대한 합계를 구한다.
        * @param {array} array 처리 대상 배열.
        * @param {number} start 배열 시작 index.
        * @param {number} len 계산할 배열 length.
        * @return {number} sum value.
        * @example
        * var counts = [2, 10, 5, 1];
        * var sum = this.gfnArraySum(counts);
        * trace("sum==>" + sum);	// output : min==>18
        * @memberOf this
        */
        this.gfnArraySum = function(array, start, len)
        {
        	if ( start == null ) start = 0;
        	if ( len == null ) len = array.length;
        	var sum = 0;
        	for (var i=start ; i<len; sum+=array[i++]);
        	return sum;
        }

        /**
        * 지정된 두 항목의 위치을 바꾼다.
        * @param {array} array exchange 대상 Array.
        * @param {number} from 바꾸고자 하는 첫번째 item index.
        * @param {number} to 바꾸고자 하는 두번째 item index.
        * @return {boolean} 위치가 정상적으로 변경되었으면 true, 그렇지않다면 false를 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var exchange = this.gfnArrayExchange(mon, 1,3);
        * trace("exchange==>" + exchange + ", mon==>" + mon);
        * // output : exchange==>true, mon==>["Jan","Apr","Mar","Feb"]
        * @memberOf this
        */
        this.gfnArrayExchange = function(array, from, to)
        {
        	if ( array[from] && array[to] )
        	{
        		var remove1 = array.splice(from, 1, "");
        		var remove2 = array.splice(to, 1, "");
        		array.splice(from, 1, remove2.pop());
        		array.splice(to, 1, remove1.pop());
        		return true;
        	}
        	else
        	{
        		return false;
        	}
        }

        /**
        * 지정된 항목을 원하는 위치로 이동시킨다.
        * @param {array} array 대상 Array.
        * @param {number} from 이동시킬 item index.
        * @param {number} to 새로 위치하고자 하는 item index.
        * @return {boolean} 위치가 정상적으로 이동되었으면 true, 그렇지않다면 false를 리턴.
        * @example
        * var mon = ["Jan","Feb","Mar","Apr"];
        * var move = this.gfnArrayMove(mon, 1,3);
        * trace("move==>" + move + ", mon==>" + mon);
        * // output : move==>true, mon==>["Jan","Mar","Apr","Feb"]
        * @memberOf this
        */
        this.gfnArrayMove = function(array, from, to)
        {
        	var i, tmp;
        	from = parseInt(from, 10);
        	to = parseInt(to, 10);

        	if (from !== to &&
        		0 <= from && from <= array.length &&
        		0 <= to && to <= array.length)
        	{

        		tmp = array[from];
        		if (from < to)
        		{
        			for (i = from; i < to; i++)
        			{
        				array[i] = array[i + 1];
        			}
        		}
        		else
        		{
        			for (i = from; i > to; i--)
        			{
        				array[i] = array[i - 1];
        			}
        		}

        		array[to] = tmp;
        		return true;
        	}

        	return false;
        }

        /**
        * 배열 항목의 필드를 기준으로 배열 항목을 정렬 처리한다.<br>
        * 배열의 각 항목은 하나 이상의 속성을 가진 객체이고,<br>
        * 모든 객체에는 최소한 하나 이상의 공통 속성을 가지며,<br>
        * 이 값은 배열 항목을 정렬하는데 사용된다.<br>
        * 매개변수가 여러개인 경우에는 첫번째 필드는 1차, 두번째 필드는 다음 정렬 필드로 사용된다.
        * @param {array} array 대상 Array.
        * @param {string...} 정렬 기준 필드명.
        * @return {array} Sort 처리된 Array.
        * @example
        * var users = [];
        * users[0] = {id:"milk", name:"park", age:33};
        * users[1] = {id:"apple", name:"kim"};
        * users[2] = {id:"oops", name:"joo", age:44};
        * users[3] = {id:"beans", name:"lee", age:50};
        * users[4] = {id:"zoo", age:65};
        * users[5] = {id:"milk", name:"", age:33};
        * users[6] = {id:"milk", name:"lee", age:33};
        * var sorted = this.gfnArraySortOn(users, "name","id");
        * for(var i=0; i < sorted.length; i++)
        * {
        * 	var tmp = sorted[i];
        * 	trace("name:" + tmp.name + " || id:" + tmp.id + " || age:" + tmp.age);
        * 	// output : name: || id:milk || age:33
        * 	// output : name:joo || id:oops || age:44
        * 	// output : name:kim || id:apple || age:undefined
        * 	// output : name:lee || id:beans || age:50
        * 	// output : name:lee || id:milk || age:33
        * 	// output : name:park || id:milk || age:33
        * 	// output : name:undefined || id:zoo || age:65
        * }
        * @memberOf this
        */
        this.gfnArraySortOn = function(array)
        {
        	var arr, i,
        		args = [];

        	arr = array.slice(0);
        	if (!arguments.length)
        	{
        		return arr.sort();
        	}

        	for (i = 0; i < arguments.length; i++)
        	{
        		args.push(arguments[i]);
        	}

        	return arr.sort(function (a, b)
        	{
        		var compareProp, prop,
        			i0, i1;

        		compareProp = args.slice(0);
        		prop = compareProp.shift();

        		while (a[prop] == b[prop] && compareProp.length)
        		{
        			prop = compareProp.shift();
        		}

        		i0 = a[prop];
        		i1 = b[prop];

        		if (i0 === undefined && i1 !== undefined)
        		{
        			return 1;
        		}
        		else if (i0 !== undefined && i1 === undefined)
        		{
        			return -1;
        		}

        		return i0 == i1 ? 0 : i0 > i1 ? 1 : -1;
        	});
        }

        /**
        * 이차원 배열의 이차 요소별로 정렬하여 새로운 배열을 반환하다.
        * @param {array} arr 2차원 배열.
        * @param {array} sortOrders 2차요소 정렬 기준("ASC":오름차순, "DESC":내림차순).
        * @return {array} 정렬 처리된 Array.
        * @example
        *	var arr = [['A', 'a', '가'],
        *			   ['A', 'a', '나'],
        *			   ['A', 'b', '나'],
        *			   ['A', 'b', '가'],
        *			   ['B', 'b', '가'],
        *			   ['B', 'b', '나'],
        *			   ['B', 'a', '가'],
        *			   ['B', 'b', '다'],
        *			   ['B', 'c', '가'],
        *			   ['A', 'd', '가'],
        *			   ['A', 'c', '가'],
        *			   ['C', 'c', '가'],
        *			   ['C', 'a', '가'],
        *			   ['C', 'b', '가']];
        *
        *   var sorted = this.gfnArraySortTwoDimensional(arr, ["ASC", "DESC", "ASC"]);
        *	for (var i=0; i<sorted.length; i++)
        *	{
        *		trace(arr[i][0] + " : " + arr[i][1] + " : " + arr[i][2]);
        *	}
        *
        *	----------
        *	output
        *	----------
        *	A : d : 가
        *	A : c : 가
        *	A : b : 나
        *	A : b : 가
        *	A : a : 나
        *	A : a : 가
        *	B : c : 가
        *	B : b : 다
        *	B : b : 나
        *	B : b : 가
        *	B : a : 가
        *	C : c : 가
        *	C : b : 가
        *	C : a : 가
        *
        * @memberOf this
        */
        this.gfnArraySortTwoDimensional = function(arr, sortOrders)
        {
        	return arr.sort(function (a, b)
        	{
        		var len = sortOrders.length;
        		for (var s=0; s<len; s++)
        		{
        			if ( sortOrders[s] == "ASC" )
        			{
        				if ( a[s] < b[s] ) return -1;
        				if ( a[s] > b[s] ) return 1;
        			}
        			else if ( sortOrders[s] == "DESC" )
        			{
        				if ( a[s] < b[s] ) return 1;
        				if ( a[s] > b[s] ) return -1;
        			}
        		}
        		return 0;
        	});
        }

        /**
        * 지정된 속성의 값이 처음으로 일치하는 객체의 배열 위치를 반환한다.<br>
        * 배열의 각 항목은 하나 이상의 속성을 가진 객체이다.<br>
        * @param {array} array 대상 Array.
        * @param {string} prop 기준 속성.
        * @param {string} item 기준 값.
        * @param {number=} from 검색 시작 위치(default: 0).
        * @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false).
        * @return {number} 검색된 배열 위치. 없다면 -1 리턴.
        * @example
        * var users = [];
        * users[0] = {id:"milk", name:"park", age:33};
        * users[1] = {id:"apple", name:"kim"};
        * users[2] = {id:"oops", name:"joo", age:44};
        * users[3] = {id:"beans", name:"lee", age:50};
        * users[4] = {id:"zoo", age:65};
        * users[5] = {id:"milk", name:"", age:33};
        * users[6] = {id:"milk", name:"lee", age:33};
        * var index = this.gfnArrayIndexOfProp(users, "name", "lee");
        * trace("index==>" + index);	// output : index==>3
        * var index = this.gfnArrayIndexOfProp(users, "age", 20);
        * trace("index==>" + index);	// output : index==>-1
        * @memberOf this
        */
        this.gfnArrayIndexOfProp = function(array, prop, item, from, strict)
        {
        	var len = array.length,
        		from = Number(from) || 0,
        		strict = strict || false,
        		 obj, propValue;

        	from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        	if (from < 0)
        	{
        		from += len;
        	}

        	if (strict)
        	{
        		for (; from < len; from++)
        		{
        			if (from in array && array[from])
        			{
        				obj = array[from],
        				propValue = obj[prop];

        				if (propValue === item)
        				{
        					return from;
        				}
        			}
        		}
        	}
        	else
        	{
        		for (; from < len; from++)
        		{
        			if (from in array && array[from])
        			{
        				obj = array[from],
        				propValue = obj[prop];

        				if (propValue == item)
        				{
        					return from;
        				}
        			}
        		}
        	}

        	return -1;
        }

        /**
        * 지정된 속성의 값이 처음으로 일치하는 객체의 배열 위치를 뒤에서부터 찾아 반환한다.<br>
        * 배열의 각 항목은 하나 이상의 속성을 가진 객체이다.<br>
        * @param {array} array 대상 Array.
        * @param {string} prop 기준 속성.
        * @param {string} item 기준 값.
        * @param {number=} from 검색 시작 위치(default: 0).
        * @param {boolean=} strict true: 형변환 없이 비교('==='), false: 형변환 후 비교('==') (default: false).
        * @return {number} 검색된 배열 위치. 없다면 -1 리턴.
        * @example
        * var users = [];
        * users[0] = {id:"milk", name:"park", age:33};
        * users[1] = {id:"apple", name:"kim"};
        * users[2] = {id:"oops", name:"joo", age:44};
        * users[3] = {id:"beans", name:"lee", age:50};
        * users[4] = {id:"zoo", age:65};
        * users[5] = {id:"milk", name:"", age:33};
        * users[6] = {id:"milk", name:"lee", age:33};
        * var index = this.gfnArrayLastIndexOfProp(users, "name", "lee");
        * trace("index==>" + index);	// output : index==>6
        * var index = this.gfnArrayLastIndexOfProp(users, "name", "lee", 5);
        * trace("index==>" + index);	// output : index==>3
        * @memberOf this
        */
        this.gfnArrayLastIndexOfProp = function(array, prop, item, from, strict)
        {
        	var i, obj,
        		propValue;

        	if (from == null)
        	{
        		from = array.length - 1;
        	}
        	else if (from < 0)
        	{
        		from = Math.max(0, array.length + from);
        	}

        	var strict = strict || false;

        	if (strict)
        	{
        		for (i=from; i>=0; i--)
        		{
        			if (i in array && array[i])
        			{
        				obj = array[i],
        				propValue = obj[prop];

        				if (propValue === item)
        				{
        					return i;
        				}
        			}
        		}
        	}
        	else
        	{
        		for (i=from; i>=0; i--)
        		{
        			if (i in array && array[i])
        			{
        				obj = array[i],
        				propValue = obj[prop];

        				if (propValue == item)
        				{
        					return i;
        				}
        			}
        		}
        	}

        	return -1;
        }

        /**
        * 배열 arr에서 배열 arr1의 모든 항목을 뺀 차 집합 배열을 리턴한다.<br>
        * @param {array} arr 기준 Array.
        * @param {array} arr1 대상 Array.
        * @return {array} 차집합 Array.
        * @example
        * var arr = [2, 10, 5, 1, 7];
        * var arr1 = [9, 15, 5, 2];
        * var result = this.gfnArrayDifference(arr , arr1);
        * trace(result);	// output : index==>10,1,7
        * @memberOf this
        */
        this.gfnArrayDifference = function(arr, arr1)
        {
        	var clone = this.gfnArrayClone(arr),
        		cln = clone.length,
        		i, j, arrLen;

        	for (i = 0,arrLen = arr1.length; i < arrLen; i++)
        	{
        		for (j = 0; j < cln; j++)
        		{
        			if (clone[j] === arr1[i])
        			{
        				this.gfnArrayRemoveAt(clone, j);
        				j--;
        				cln--;
        			}
        		}
        	}

        	return clone;
        }

        /**
        * source Array의 시작 index로 주어진 length길이만큼 요소들을 destination Array의 시작 index에서 부터 복사한다.<br>
        * Java에서 System.arraycopy 함수와 동일하다고 보면 된다.
        * @param {array} arr 소스 array.
        * @param {array} srcPos 소스 array에서 읽기 시작할 위치.
        * @param {array} dest 복사대상 array.
        * @param {array} destPos 복사대상 array에 데이터를 쓸 때 시작위치.
        * @param {array} length 소스 array에서 읽어들일 길이.
        * @example
        *	var copyFrom = [ 'd', 'e', 'c', 'a', 'f', 'f', 'e', 'i', 'n', 'a', 't', 'e', 'd' ];
        *	var copyTo = new Array(7);
        *
        *   // copies an array from the specified source array
        *	this.gfnArrayArrayCopy(copyFrom, 2, copyTo, 0, 7);
        *	trace(copyTop.join("")); // output : caffein
        * @memberOf this
        */
        this.gfnArrayArrayCopy = function(src, srcPos, dest, destPos, length)
        {
        	if ( !length ) return;
        	// copy src to dest from index srcPos to index destPos of length recursivly on objects
        	var cnt = length + srcPos;
        	if ( src == dest )
        	{
        		src = src.slice(srcPos, cnt);
        		cnt = src.length;
        		for (var i = 0, j = destPos; i < cnt; i++, j++)
        		{
        			dest[j] = src[i];
        		}
        	}
        	else
        	{
        		for (var i = srcPos, j = destPos; i < cnt; i++, j++)
        		{
        			dest[j] = src[i];
        		}
        	}
        }

        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
