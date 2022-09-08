"""Test tools/new.py."""

import typing as t

from hypothesis import given, strategies as st
from slipbox.tools.new import missing_integers, take


@given(st.lists(st.integers(min_value=0, max_value=1000)).map(sorted))  # type: ignore # noqa
def test_missing_integers_are_not_in_the_input(integers: t.List[int]) -> None:
    """It should generate integers not in the input."""
    count = integers[-1] if integers else 10
    result = take(count, missing_integers(integers))
    assert all(x not in integers for x in result)


@given(st.lists(st.integers(min_value=0)).map(sorted))  # type: ignore # noqa
def test_missing_integers_are_increasing(integers: t.List[int]) -> None:
    """Generated numbers should be sorted in increasing order."""
    result = list(take(len(integers), missing_integers(integers)))
    for i in range(1, len(result)):
        assert result[i-1] < result[i]


@given(st.lists(st.integers(min_value=0)).map(sorted))  # type: ignore # noqa
def test_missing_integers_do_not_contain_zero(integers: t.List[int]) -> None:
    """Generated numbers shouldn't contain 0."""
    assert next(missing_integers(integers)) > 0
